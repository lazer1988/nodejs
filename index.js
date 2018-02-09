require('colors'); // color output in console
let CoinMarketCapApi = require('./src/BitcoinApi/CoinMarketCapApi');
let CexIOApi = require('./src/BitcoinApi/CexIOApi');
let App = require('./src/Core/App');

let application = new App(new CexIOApi(), new CoinMarketCapApi());
application.run();
