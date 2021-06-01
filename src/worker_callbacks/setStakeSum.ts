import setStakeSumGenerator, {
  clearStakeSumGenerator,
} from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';
import { sumInputSelector } from '../stake_info/getCurrentSum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const preInputCheck = (sum: number): boolean => {
//   return true;
// };

const setStakeSumOptions = {
  sumInputSelector,
  // alreadySetCheck: {
  //   falseOnSumChange: false,
  // },
  // preInputCheck,
  inputType: 'react' as 'fireEvent' | 'react' | 'nativeInput',
  // fireEventNames: ['input'],
  // context: () => document,
};

const setStakeSum = setStakeSumGenerator(setStakeSumOptions);

export const clearStakeSum = clearStakeSumGenerator(setStakeSumOptions);

export default setStakeSum;
