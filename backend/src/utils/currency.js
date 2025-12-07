const CURRENCIES = {
    BRL: { symbol: 'R$', rate: 1.0 },
    USD: { symbol: '$', rate: 0.20 },
    EUR: { symbol: '€', rate: 0.18 }
};

function convertPrice(priceBRL, currency) {
    return Math.round(priceBRL * CURRENCIES[currency].rate * 100) / 100;
}

function detectCurrency(req) {
    const lang = req.headers['accept-language'] || '';
    if (lang.includes('pt')) return 'BRL';
    if (lang.includes('en')) return 'USD';
    return 'EUR';
}

module.exports = { CURRENCIES, convertPrice, detectCurrency };
