import {
  getElement,
  log,
  repeatingOpenBet,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import { getReactInstance } from '@kot-shrodingera-team/germes-utils/reactUtils';
import getStakeCount from '../stake_info/getStakeCount';
import clearCoupon from './clearCoupon';
import updateMaximumStake from './helpers/updateMaximumStake';
import updateMinimumStake from './helpers/updateMinimumStake';

const openBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                              Очистка купона                              */
  /* ======================================================================== */

  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }

  /* ======================================================================== */
  /*                      Формирование данных для поиска                      */
  /* ======================================================================== */

  const { title_name: targetMarketTemplateName, bet_name: targetBetName } =
    JSON.parse(worker.BetId);
  log(`targetMarketTitleName: "${targetMarketTemplateName}"`, 'white', true);
  log(`targetBetName: "${targetBetName}"`, 'white', true);

  /* ======================================================================== */
  /*                              Поиск маркета                               */
  /* ======================================================================== */

  const markets = [
    ...document.querySelectorAll('.__app-TableGroupMarket-table'),
  ];
  if (!markets.length) {
    throw new JsFailError('Не найдено ни одного маркета');
  }
  log(`Ищем маркет "${targetMarketTemplateName}"`, 'steelblue');

  const targetMarketHeader = await getElement(
    `[class*="marketTable__header___"][title="${targetMarketTemplateName}"]`
  );
  if (!targetMarketHeader) {
    throw new JsFailError('Не найден подходящий заголовок маркета');
  }
  const targetMarket = targetMarketHeader.parentElement.parentElement;
  log('Маркет найден', 'cadetblue', true);

  // const targetMarket = markets.find((market) => {
  //   const marketReactInstance = getReactInstance(market) as MarketReactInstance;
  //   if (
  //     !marketReactInstance ||
  //     !marketReactInstance.return ||
  //     !marketReactInstance.return.memoizedProps ||
  //     !marketReactInstance.return.memoizedProps.marketTemplateName
  //   ) {
  //     return null;
  //   }
  //   const { marketTemplateName } = marketReactInstance.return.memoizedProps;
  //   log(`[Market] "${marketTemplateName}"`, 'white', true);
  //   return marketTemplateName === targetMarketTemplateName;
  // });
  // if (!targetMarket) {
  //   throw new JsFailError('Маркет не найден');
  // }

  /* ======================================================================== */
  /*                          Поиск ставки в маркете                          */
  /* ======================================================================== */

  const betButtons = [
    ...targetMarket.querySelectorAll<HTMLElement>(
      'button[data-analytics-info="bet_add"]'
    ),
  ];

  log(`Ищем ставку "${targetBetName}"`, 'steelblue');

  const bet = betButtons.find((button) => {
    const reactInstance = getReactInstance(button) as OddReactInstance;
    if (
      !reactInstance ||
      !reactInstance.return ||
      !reactInstance.return.return ||
      !reactInstance.return.return.memoizedProps ||
      !reactInstance.return.return.memoizedProps.odd ||
      !reactInstance.return.return.memoizedProps.odd.name
    ) {
      return null;
    }
    if (reactInstance) {
      return (
        reactInstance.return.return.memoizedProps.odd.name === targetBetName
      );
    }
    return false;
  });
  if (!bet) {
    throw new JsFailError('Ставка не найдена');
  }
  log('Ставка найдена', 'cadetblue', true);

  if (bet.classList.contains('__app-Odd-is-disabled')) {
    throw new JsFailError('Ставка заблокирована');
  }

  /* ======================================================================== */
  /*           Открытие ставки, проверка, что ставка попала в купон           */
  /* ======================================================================== */

  const openingAction = async () => {
    bet.click();
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  /* ======================================================================== */
  /*                       Получение максимальной ставки                      */
  /* ======================================================================== */

  await updateMinimumStake();
  await updateMaximumStake();

  /* ======================================================================== */
  /*                    Вывод информации об открытой ставке                   */
  /* ======================================================================== */

  const eventNameSelector = '.__app-MatchDetails-team';
  const marketNameSelector = '.__app-OddDetails-market';
  const betNameSelector = '.__app-OddDetails-team';

  const eventNameElement = document.querySelector(eventNameSelector);
  const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  if (!eventNameElement) {
    throw new JsFailError('Не найдено событие открытой ставки');
  }
  if (!marketNameElement) {
    throw new JsFailError('Не найден маркет открытой ставки');
  }
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const eventName = eventNameElement.textContent.trim();
  const marketName = marketNameElement.textContent.trim();
  const betName = betNameElement.textContent.trim();

  log(`Открыта ставка\n${eventName}\n${marketName}\n${betName}`, 'steelblue');
};

export default openBet;
