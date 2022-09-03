axios.defaults.baseURL = 'https://api.nbp.pl/api/exchangerates/tables/a/';

const availableCurrencies = ['USD', 'EUR', 'CHF'];
const currencySelect = document.getElementById('currencySelect');
const inputAmount = document.getElementById('inputAmount');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('convertedCurrency');
const titleBar = document.getElementById('titleBar');
const resetBtn = document.getElementById('reset');

titleBar.innerText = 'loading ...';

axios
  .get('/')
  .then((response) => {
    titleBar.innerText = 'Przelicznik walut';
    const loader = document.getElementById('loader');
    loader.classList.remove('loader');

    const filteredRates = response.data[0].rates.filter((el) => {
      if (availableCurrencies.includes(el.code)) {
        return el;
      }
    });

    filteredRates.forEach((element) => {
      const option = document.createElement('option');
      option.textContent = element.code;
      option.value = element.mid;
      currencySelect.appendChild(option);
    });
  })
  .catch((err) => {
    console.error(err);
  });

submitBtn.addEventListener('click', () => {
  const inputValue = Number(inputAmount.value);
  const selectValue = Number(currencySelect.value);
  if (!inputAmount.value || !currencySelect.value) {
    return alert('Wpisz kwote i wybierz walute');
  }

  const h4 = document.getElementById('result');

  const result = (inputValue * selectValue).toFixed(2);

  h4.innerText = result + ' ' + 'zł';
});
