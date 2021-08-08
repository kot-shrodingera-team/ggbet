import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const preOpenBet = async (): Promise<void> => {
  const betslipTab = await getElement<HTMLElement>(
    '.__app-Tabs-tab:nth-child(1)',
    10000
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
