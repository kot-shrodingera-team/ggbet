import {
  elementRemoved,
  getElement,
  log,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const preOpenBet = async (): Promise<void> => {
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

  const betslipTab = await getElement<HTMLElement>(
    '.__app-Tabs-tab:nth-child(1)'
  );
  if (!betslipTab) {
    throw new JsFailError('Не найдена вкладка "Купон Пари"');
  }
  log('Появилась вкладка "Купон Пари"', 'cadetblue', true);
  betslipTab.click();

  const betslipContainer = await getElement(
    '.__app-Betslip-container .__app-Body-container'
  );
  if (!betslipContainer) {
    throw new JsFailError('Не появился контейнер купонов');
  }
  log('Появился контейнер купонов', 'cadetblue', true);
};

export default preOpenBet;
