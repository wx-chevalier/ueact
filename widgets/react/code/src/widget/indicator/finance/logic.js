

/**
 * Description 获取当前货币的表示
 * @param currency
 * @return {*}
 */
export const getCurrencyData = currency => ({
    CNY: { base: 100, symbol: '￥' },
    GBP: { base: 100, symbol: '£' },
    USD: { base: 100, symbol: '$' }
  }[currency]);

/**
 * Description 格式化当前货币显示
 * @param amount
 * @param base
 * @return {string}
 */
export const formatAmount = (amount, base) => parseFloat(amount / base).toFixed(2);
