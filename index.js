let currency;

(async function() {
  await setCurrency();

  browser.contextMenus.create({
    id: 'convert-currency-default',
    title: `Convert to default (${currency})`,
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'convert-currency-usd',
    title: 'Convert to USD',
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'convert-currency-gbp',
    title: 'Convert to GBP',
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'convert-currency-eur',
    title: 'Convert to EUR',
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'convert-currency-ils',
    title: 'Convert to ILS',
    contexts: ['selection'],
  });
})();

async function updateMenu() {
  await browser.contextMenus.update('convert-currency-default', {
    title: `Convert to default (${currency})`
  });
}

async function setCurrency() {
  const defaultCurrency = await browser.storage.local.get('default_currency');
  const defaultCurrencyValue = defaultCurrency['default_currency'] || 'USD';
  currency = defaultCurrencyValue;
}

browser.storage.onChanged.addListener(async () => {
  await setCurrency();
  await updateMenu();
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  await updateMenu();
  const { currency: fromCurrency, amount } = formatCurrency(info.selectionText);
  if (info.menuItemId === 'convert-currency-default') convertCurrency(tab.id, currency, fromCurrency, amount);
  else if (info.menuItemId.startsWith('convert-currency-')) {
    const currency = info.menuItemId.replace('convert-currency-', '');
    convertCurrency(tab.id, currency.toUpperCase(), fromCurrency, amount);
  }
});