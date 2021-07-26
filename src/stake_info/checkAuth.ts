import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const noAuthElementSelector =
  '.header__betting-elements.header__betting--hide, .header__betting-elements.header__betting-elements--no-login';
export const authElementSelector =
  '.header__betting-elements:not(.header__betting--hide):not(.header__betting-elements--no-login)';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector,
  authElementSelector,
  // maxDelayAfterNoAuthElementAppeared: 0,
  // context: () => document,
});

const checkAuth = checkAuthGenerator({
  authElementSelector,
  // context: () => document,
});

export default checkAuth;
