import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount, getCurrencyData } from './logic';

/**
 * Description 显示金融数额
 * @param currency
 * @param amount
 * @return {XML}
 * @constructor
 */
const Money = ({ currency, amount }) => {
  const currencyData = getCurrencyData(currency);
  if (currencyData) {
    const { symbol, base } = currencyData;
    const formatted = formatAmount(amount, base);

    return (
      <span>
        {symbol}
        {formatted}
      </span>
    );
  } 
    return (
      <span>
        {amount}
      </span>
    );
  
};

Money.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};

export default Money;
