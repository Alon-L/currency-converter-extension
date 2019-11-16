async function convertCurrency(tabId, toCurrency, fromCurrency, amount) {
  const query = `${fromCurrency}_${toCurrency}`;
  const res = await sendRequest(query);
  const body = await res.json();

  const converted = (parseFloat(amount) * body[query]).toFixed(2);
  if (isNaN(converted)) return;

  await browser.tabs.sendMessage(
    tabId,
    { converted: `${converted} ${toCurrency}` }
  );
}

async function sendRequest(query) {
  const url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${apiKey}`;

  try {
    return await fetch(url);
  } catch (err) {
    console.error(err);
  }
}