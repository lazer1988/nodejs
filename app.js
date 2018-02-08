let CoinMarketCapApi = require('./src/BitcoinApi/CoinMarketCapApi');
let CexIOApi = require('./src/BitcoinApi/CexIOApi');

var coin = new CoinMarketCapApi();
coin.updatePrice();
coin.on('updated', function(){
    console.log('coin', coin.getPrice());
});

var cex = new CexIOApi();

cex.updatePrice();
cex.on('updated', function(){
    console.log('cex', cex.getPrice());
});
