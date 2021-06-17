import {
  awaiter,
  fireEvent,
  getElement,
  log,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import getCurrentSum, {
  sumInputSelector,
} from '../../stake_info/getCurrentSum';
import { clearStakeSum } from '../../worker_callbacks/setStakeSum';

const updateMaximumStake = async (): Promise<void> => {
  clearStakeSum();
  const sumInput = await getElement(sumInputSelector);
  if (!sumInput) {
    throw new JsFailError('Не найдено поле ввода суммы ставки');
  }
  log('Фокусируемся на поле ввода суммы ставки', 'darksalmon', true);
  fireEvent(sumInput, 'focus');
  const firstMaxBetButton = await getElement(
    '.__app-DropDown-stake-list > [data-stake]'
  );
  if (!firstMaxBetButton) {
    throw new JsFailError(
      'Не найдена первая кнопка выбора максимальной ставки'
    );
  }
  log('Появилась кнопка первой максимальной ставки', 'cadetblue', true);
  // const firstMaxBetButtonInitialValue =
  //   firstMaxBetButton.getAttribute('data-stake');
  // log(
  //   `firstMaxBetButtonInitialValue = ${firstMaxBetButtonInitialValue}`,
  //   'white',
  //   true
  // );
  const firstMaxBetButtonValueChanged = await awaiter(() => {
    return firstMaxBetButton.getAttribute('data-stake') !== '100';
  });
  if (!firstMaxBetButtonValueChanged) {
    throw new JsFailError('Сумма первой максимальнй ставки не поменялась');
  }
  const firstMaxBetButtonNewValue =
    firstMaxBetButton.getAttribute('data-stake');
  log(
    `firstMaxBetButtonNewValue = ${firstMaxBetButtonNewValue}`,
    'white',
    true
  );
  const maxBetButton = await getElement('[class*="DropDown__bet-max___"]');
  if (!maxBetButton) {
    throw new JsFailError('Не найдена кнопка выбора максимальной ставки');
  }
  log('Появилась кнопка максимальной ставки', 'cadetblue', true);
  // console.log(maxBetButton);
  // (window as any).maxBetButton = maxBetButton;
  // const observer = new MutationObserver((mutations) => {
  //   console.log(mutations);
  // });
  // observer.observe(document, {
  //   attributes: true,
  //   childList: true,
  //   subtree: true,
  // });
  // await sleep(5000);
  // observer.disconnect();
  // throw new JsFailError('Test');
  log('Выбираем максимальную ставку', 'darksalmon', true);
  fireEvent(maxBetButton, 'mousedown');
  const sumChanged = await awaiter(() => {
    return getCurrentSum() !== 0;
  });
  if (!sumChanged) {
    throw new JsFailError('Сумма ставки не изменилась, после получения макса');
  }
  window.germesData.maximumStake = getCurrentSum();
  log(
    `Максимальная ставка: ${window.germesData.maximumStake}`,
    'darksalmon',
    true
  );
  clearStakeSum();
};

export default updateMaximumStake;
