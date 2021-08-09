import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const preOpenBet = async (): Promise<void> => {
  const sibebarTogglerNotOpennedButtonSelector =
    '[class*="sidebarToggler__container___"]:not([class*="sidebarToggler__is-open-sidebar___"]) > [class*="sidebarToggler__btn___"]';
  const betlipTabSelector = '.__app-Tabs-tab:nth-child(1)';

  await Promise.race([
    getElement(sibebarTogglerNotOpennedButtonSelector, 10000),
    getElement(betlipTabSelector, 10000),
  ]);
  const sideBarTogglerNotOpennedButton = document.querySelector<HTMLElement>(
    sibebarTogglerNotOpennedButtonSelector
  );
  if (sideBarTogglerNotOpennedButton) {
    log('Открываем боковую панель', 'orange');
    sideBarTogglerNotOpennedButton.click();
    await getElement<HTMLElement>(betlipTabSelector, 2000);
  }
  const betslipTab = document.querySelector<HTMLElement>(betlipTabSelector);
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
