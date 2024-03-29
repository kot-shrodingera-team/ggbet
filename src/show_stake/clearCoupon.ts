import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';

// const preCheck = async (): Promise<boolean> => {
//   return true;
// };

// const apiClear = (): void => {};

// const postCheck = async (): Promise<boolean> => {
//   return true;
// };

const clearCoupon = clearCouponGenerator({
  // preCheck,
  getStakeCount,
  // apiClear,
  // clearSingleSelector: '',
  clearAllSelector:
    '.__app-BetslipHeader-BetslipHeader-button-wrapper > :last-child > svg',
  // postCheck,
  // context: () => document,
});

export default clearCoupon;
