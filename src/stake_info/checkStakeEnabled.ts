import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import { log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from './getStakeCount';

const preCheck = (): boolean => {
  const acceptNewCoefOkButton = document.querySelector<HTMLElement>(
    '.__app-AcceptNewCoefModal-ok'
  );
  if (acceptNewCoefOkButton) {
    log('Принимаем изменения коэффициентов');
    acceptNewCoefOkButton.click();
  }
  return true;
};

const checkStakeEnabled = checkStakeEnabledGenerator({
  preCheck,
  getStakeCount,
  betCheck: {
    selector: '.__app-Odd-container',
    errorClasses: [
      {
        className: '__app-Odd-container-is-error',
        message: 'Ошибка',
      },
      {
        className: '__app-Odd-container-is-expired',
        message: 'Заблокирован',
      },
    ],
  },
  // errorsCheck: [
  //   {
  //     selector: '',
  //     message: '',
  //   },
  // ],
  // context: () => document,
});

export default checkStakeEnabled;
