import doStakeGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/doStake';
import getCoefficient from '../stake_info/getCoefficient';

// const preCheck = (): boolean => {
//   return true;
// };

// const postCheck = (): boolean => {
//   return true;
// };

const doStake = doStakeGenerator({
  // preCheck,
  doStakeButtonSelector: '.__app-PlaceBet-container',
  errorClasses: [
    {
      className: 'placeBet__is-disabled___2ckKJ',
      message: 'Кнопка ставки недоступна',
    },
  ],
  // disabledCheck: false,
  getCoefficient,
  // postCheck,
  // context: () => document,
});

export default doStake;
