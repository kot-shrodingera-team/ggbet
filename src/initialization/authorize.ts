import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
// import { authElementSelector } from '../stake_info/checkAuth';
// import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

// const setLoginType = async (): Promise<boolean> => {
//   return true;
// };

const authorize = authorizeGenerator({
  openForm: {
    selector: '.auth-bar__link',
    openedSelector: '.popup-layout',
    // loopCount: 10,
    // triesInterval: 1000,
    // afterOpenDelay: 0,
  },
  // setLoginType,
  loginInputSelector: 'input#_username',
  passwordInputSelector: 'input#_password',
  submitButtonSelector: '.popup-layout form button.btn-success',
  // inputType: 'fireEvent',
  fireEventNames: ['input'],
  // beforeSubmitDelay: 0,
  // captchaSelector: '',
  // loginedWait: {
  //   loginedSelector: authElementSelector,
  //   timeout: 5000,
  //   balanceReady,
  //   updateBalance,
  //   afterSuccesfulLogin,
  // },
  // context: () => document,
});

export default authorize;
