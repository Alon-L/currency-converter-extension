const defaultCurrencyDom = document.getElementById('defaultCurrency');
const defaultCurrencyForm = document.getElementById('defaultCurrencyForm');
const defaultCurrencySelector = document.getElementById('defaultCurrencySelector');

(async function() {
  const defaultCurrency = await browser.storage.local.get('default_currency');
  const defaultCurrencyValue = defaultCurrency['default_currency'] || 'USD';
  defaultCurrencyDom.innerText = defaultCurrencyValue;

  const option = document.querySelector(`option[value=${defaultCurrencyValue}]`);
  if (option) option.selected = 'selected';
})();

defaultCurrencyForm.addEventListener('submit', submitSettings);

async function submitSettings() {
  const { value } = defaultCurrencySelector;

  await browser.storage.local.set({
    'default_currency': value.toUpperCase()
  });
}