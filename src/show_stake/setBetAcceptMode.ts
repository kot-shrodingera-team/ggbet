import { fireEvent, getElement, log } from '@kot-shrodingera-team/germes-utils';

const setBetAcceptMode = async (): Promise<void> => {
  const updateSettingButton = document.querySelector(
    'svg[data-analytics-info="odds_updates"]'
  );
  if (!updateSettingButton) {
    log('Не найдена кнопка изменения настроек принятия', 'crimson');
    return;
  }
  fireEvent(updateSettingButton, 'click');
  if (worker.StakeAcceptRuleShoulder === 0) {
    const dontAcceptChangedCheckbox = await getElement<HTMLElement>(
      '.__app-UpdatesSettings-container > .__app-CheckListItem-container:nth-child(4)'
    );
    if (!dontAcceptChangedCheckbox) {
      log(
        'Не найдена кнопка принятия ставок только с текущим коэффициентом',
        'crimson'
      );
      return;
    }
    log(
      'Устанавливаем режим принятия ставок только с текущим коэффициентом',
      'orange'
    );
    dontAcceptChangedCheckbox.click();
  } else if (worker.StakeAcceptRuleShoulder === 1) {
    const acceptGreaterCheckbox = await getElement<HTMLElement>(
      '.__app-UpdatesSettings-container > .__app-CheckListItem-container:nth-child(3)'
    );
    if (!acceptGreaterCheckbox) {
      log(
        'Не найдена кнопка принятия ставок с повышением коэффициента',
        'crimson'
      );
      return;
    }
    log(
      'Устанавливаем режим принятия ставок с повышением коэффициента',
      'orange'
    );
    acceptGreaterCheckbox.click();
  } else if (worker.StakeAcceptRuleShoulder === 2) {
    const acceptAnyCheckbox = await getElement<HTMLElement>(
      '.__app-UpdatesSettings-container > .__app-CheckListItem-container:nth-child(2)'
    );
    if (!acceptAnyCheckbox) {
      log(
        'Не найдена кнопка принятия ставок с любым изменением коэффициента',
        'crimson'
      );
      return;
    }
    log(
      'Устанавливаем режим принятия ставок с любым изменением коэффициента',
      'orange'
    );
    acceptAnyCheckbox.click();
  } else {
    log('Непонятная настройка принятия. Обратитесь в ТП', 'red');
  }
};

export default setBetAcceptMode;
