import {
  getWorkerParameter,
  log,
  text,
} from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  if (
    getWorkerParameter('fakeParameter') ||
    getWorkerParameter('fakeOpenStake')
  ) {
    const parameter = Number(JSON.parse(worker.ForkObj).param);
    if (Number.isNaN(parameter)) {
      return -6666;
    }
    return parameter;
  }

  const marketNameSelector = '.__app-OddDetails-market';
  const betNameSelector = '.__app-OddDetails-team';

  const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  if (!marketNameElement) {
    log('Не найден маркет ставки', 'crimson');
    return -9999;
  }
  if (!betNameElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }

  const marketName = text(marketNameElement);
  const betName = text(betNameElement);

  if (marketName === 'Фора 0') {
    return 0;
  }

  const totalParameterRegex = /(\d+(?:\.\d+)?)$/;
  const totalParameter = betName.match(totalParameterRegex);
  if (totalParameter) {
    return Number(totalParameter[1]);
  }

  const handicapParameterRegex = /\(([+-]?\d+(?:\.\d+)?)\)$/;
  const handicapParameterMatch = betName.match(handicapParameterRegex);
  if (handicapParameterMatch) {
    return Number(handicapParameterMatch[1]);
  }
  return -6666;
};

export default getParameter;
