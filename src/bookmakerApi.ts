declare global {
  // interface GermesData {}

  interface MarketReactInstance {
    return: {
      memoizedProps: {
        marketTemplateName: string;
      };
    };
  }

  interface OddReactInstance {
    return: {
      memoizedProps: {
        betslipBetId: string;
      };
      return: {
        memoizedProps: {
          odd: {
            name: string;
          };
        };
      };
    };
  }
}

export const clearGermesData = (): void => {
  window.germesData = {
    bookmakerName: 'GGbet',
    minimumStake: undefined,
    maximumStake: undefined,
    betProcessingStep: undefined,
    betProcessingAdditionalInfo: undefined,
    doStakeTime: undefined,
    betProcessingTimeout: 50000,
    stakeDisabled: undefined,
    stopBetProcessing: () => {
      window.germesData.betProcessingStep = 'error';
      window.germesData.stakeDisabled = true;
    },
  };
};

export default {};
