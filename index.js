let CoinMarketCapApi = require('./src/BitcoinApi/CoinMarketCapApi');
let CexIOApi = require('./src/BitcoinApi/CexIOApi');
let App = require('./src/Core/App');

let app = new App(new CexIOApi(), new CoinMarketCapApi());
app.run();
