export const getCryptoData = async () => {
    const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    );
    
    if (!response.ok) {
        throw new Error('Error in fetching data');
    }
    
    return response.json();
};



export const getCoinChartData = async (coinId = 'bitcoin') => {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`
    );
    const data = await response.json();
    
    return data.prices.map(item => ({
        
        date: new Date(item[0]).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
        price: parseFloat(item[1].toFixed(2)) 
    }));
};