import {
  elementRemoved,
  getElement,
  log,
} from '@kot-shrodingera-team/germes-utils';
import {
  JsFailError,
  NewUrlError,
} from '@kot-shrodingera-team/germes-utils/errors';

const openEvent = async (): Promise<void> => {
  const currentEventPathMatch = window.location.href.match(/\/([^/]*)\/?$/);
  if (!currentEventPathMatch) {
    log(window.location.href, 'crimson');
    throw new JsFailError('Не найдена часть события в текущем адресе');
  }
  const currentEventPath = currentEventPathMatch[1];

  const targetEventPathMatch = worker.EventUrl.match(/\/([^/]*)\/?$/);
  if (!targetEventPathMatch) {
    log(worker.EventUrl, 'crimson');
    throw new JsFailError('Не найдена часть события в целевом адресе');
  }
  const targetEventPath = targetEventPathMatch[1];

  if (
    worker.GetSessionData(
      `${window.germesData.bookmakerName}.TransitionToEventPage`
    ) === '0'
  ) {
    if (currentEventPath === targetEventPath) {
      log('Уже открыто нужное событие', 'steelblue');
      log(`${window.location.href} === ${worker.EventUrl}`, 'white', true);
      log(`${currentEventPath} === ${targetEventPath}`, 'white', true);
      return;
    }
    log(`${window.location.href} !== ${worker.EventUrl}`, 'white', true);
    log(`${currentEventPath} !== ${targetEventPath}`, 'white', true);
    worker.SetSessionData(
      `${window.germesData.bookmakerName}.TransitionToEventPage`,
      '1'
    );
    window.location.href = worker.EventUrl;
    throw new NewUrlError('Переходим на событие');
  }
  // Если была попытка перехода на страницу события
  if (currentEventPath === targetEventPath) {
    log('Открыли нужное событие', 'steelblue');
    log(`${window.location.href} === ${worker.EventUrl}`, 'white', true);
    log(`${currentEventPath} === ${targetEventPath}`, 'white', true);
    /* ======================================================================== */
    /*                  Ожидание появление какой-нибудь ставки                  */
    /* ======================================================================== */

    const anyBet = await getElement('button.__app-Odd-button');
    if (!anyBet) {
      throw new JsFailError('Не появилась первая ставка');
    }
    log('Появилась первая ставка', 'cadetblue', true);
    const anyBetRemoved = await elementRemoved(anyBet);
    if (!anyBetRemoved) {
      throw new JsFailError('Не изчезла первая ставка');
    }
    log('Первая ставка исчезла', 'cadetblue', true);
    const newAnyBet = await getElement('button.__app-Odd-button');
    if (!newAnyBet) {
      throw new JsFailError('Не появилась повторно первая ставка');
    }
    log('Появилась повторно первая ставка', 'cadetblue', true);
    return;
  }
  log(`${window.location.href} !== ${worker.EventUrl}`, 'white');
  log(`${currentEventPath} !== ${targetEventPath}`, 'white');
  throw new JsFailError('Не удалось перейти на нужное событие');
};

export default openEvent;
