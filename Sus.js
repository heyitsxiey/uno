async function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('currencyResult').textContent = 'Please enter a valid amount.';
        return;
    }
    try {
        const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`);
        
        if (!response.ok) {
            throw new Error('Unable to fetch exchange rates.');
        }
        const data = await response.json();
        const rate = data.rates[toCurrency];

        if (rate) {
            
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById('currencyResult').textContent = 
                `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            document.getElementById('currencyResult').textContent = 'Invalid currency codes.';
        }
    } catch (error) {
        document.getElementById('currencyResult').textContent = `Error: ${error.message}`;
    }
}
async function fetchAndDisplayExchangeRates() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,INR,PHP');
        
        if (!response.ok) {
            throw new Error('Unable to fetch real-time exchange rates.');
        }

        const data = await response.json();
        const rates = data.rates;

        const ratesList = document.getElementById('exchangeRatesList');
        ratesList.innerHTML = '';

        for (const [currency, rate] of Object.entries(rates)) {
            const listItem = document.createElement('li');
            listItem.textContent = `1 USD = ${rate} ${currency}`;
            ratesList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        document.getElementById('exchangeRatesList').innerHTML = 'Error fetching exchange rates.';
    }
}

window.onload = fetchAndDisplayExchangeRates;
