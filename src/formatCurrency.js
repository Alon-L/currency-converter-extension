const symbols = {
  '$': 'USD', // U.S. Dollar
  'A$': 'AUD', // Australian Dollar
  'R$': 'BRL', // Brazilian Real
  'C$': 'CAD', // Canadian Dollar
  'Kč': 'CZK', // Czech Koruna
  'kr': 'DKK', // Danish Krone
  '€': 'EUR', // Euro
  'HK$': 'HKD', // Hong Kong Dollar
  'Ft': 'HUF', // Hungarian Forint
  '₪': 'ILS', // Israeli New Sheqel
  '₹': 'INR', // Indian Rupee
  '¥': 'JPY', // Japanese Yen
  'RM': 'MYR', // Malaysian Ringgit
  'MEX$': 'MXN', // Mexican Peso
  'kr': 'NOK', // Norwegian Krone
  'NZ$': 'NZD', // New Zealand Dollar
  '₱': 'PHP', // Philippine Peso
  'zł': 'PLN',// Polish Zloty
  '£': 'GBP', // Pound Sterling
  'kr': 'SEK', // Swedish Krona
  'Fr': 'CHF', // Swiss Franc
  'NT$': 'TWD', // Taiwan New Dollar
  '฿': 'THB', // Thai Baht
  '₺': 'TRY' // Turkish Lira
};

function formatCurrency(text) {
  let currency = (text
    .match(/[^.0-9]+/g) || ['USD'])
    .join('')
    .toLowerCase()
    .replace(/ /g, '');

  const amount = text
    .replace(/[^.0-9]+/g, '');

  for (const symbol in symbols) {
    if (currency === symbol.toLowerCase()) {
      currency = symbols[symbol];
      break;
    }
  }

  return {
    currency: currency.toUpperCase(),
    amount
  };
}