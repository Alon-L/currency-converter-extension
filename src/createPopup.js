browser.runtime.onMessage.addListener(request => {
  const selected = window.getSelection().anchorNode.parentElement;
  const x = window.scrollX + selected.getBoundingClientRect().left + selected.offsetWidth / 2;
  const y = window.scrollY + selected.getBoundingClientRect().top - selected.offsetHeight * 0.8;

  const popup = document.createElement('div');
  popup.id = `currency-converter-popup-${genId()}`;
  popup.innerHTML = `
    <div style="background-color: white; color: black; text-align: center; padding: .6rem 1.5rem .6rem 1rem; border-radius: .35rem; margin-bottom: 1rem; font-family: Roboto, sans-serif; position: relative; border: 2px solid rgba(0, 0, 0, .2); box-shadow: 0 0 2px rgba(0, 0, 0, .2)">
      <div onclick="(function() { document.getElementById('${popup.id}').parentNode.removeChild(document.getElementById('${popup.id}')) })()" style="position: absolute; right: .5rem; top: .5rem; width: .5rem; height: .5rem; cursor: pointer">
        <div style="position: absolute; left: 5px; content: ' '; height: 9px; width: 1px; background-color: #333; transform: rotate(45deg);"></div>
        <div style="position: absolute; left: 5px; content: ' '; height: 9px; width: 1px; background-color: #333; transform: rotate(-45deg);"></div>
      </div>
      <h3 style="margin: 0;">${request.converted}</h3>
    </div>
  `;
  popup.style = `transform: translate(-50%, -50%); position: absolute; left: ${x}px; top: ${y}px`;

  document.body.appendChild(popup);
});

function genId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}