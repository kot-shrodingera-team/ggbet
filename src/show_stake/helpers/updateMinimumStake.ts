import { getElement, log, text } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import setStakeSum, { clearStakeSum } from '../../worker_callbacks/setStakeSum';

const updateMinimumStake = async (): Promise<void> => {
  setStakeSum(0.01, false, true);
  const errorElement = await getElement('.__app-Error-container');
  if (!errorElement) {
    throw new JsFailError('Не найдена ошибка минимальной ставки');
  }
  log('Появилась ошибка минимальной ставки', 'cadetblue', true);
  const errorText = text(errorElement);
  const minimumStakeRegex =
    /^(?:Сумма минимальной ставки|(?:Внимание! )?Минимальная сумма): (\d+(?:\.\d+)?)$/i;
  const minimumStakeMatch = errorText.match(minimumStakeRegex);
  if (!minimumStakeMatch) {
    log(errorText, 'tomato');
    throw new JsFailError('Непонятный формат ошибки минимальной ставки');
  }
  window.germesData.minimumStake = Number(minimumStakeMatch[1]);
  log(
    `Минимальная ставка: ${window.germesData.minimumStake}`,
    'darksalmon',
    true
  );
  clearStakeSum();
};

export default updateMinimumStake;
