function formatCurrency(currency) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const amount = formatter.format(currency / 100);
  return amount;
}

export default formatCurrency;
