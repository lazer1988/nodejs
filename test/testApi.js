require('colors'); // color output in console
const assert = require('assert');
const App = require('./../src/Core/App');
const CexIOApiMock = require('./mock/CexIOApiMock');
const CoinMarketCapApiMock = require('./mock/CoinMarketCapApiMock');

describe('test price difference', function(){
    it('calculate price diff', function(){
        let application = new App(new CexIOApiMock(), new CoinMarketCapApiMock());
        application.run();

        assert.equal(application.priceDiff, 1.8128);
    });
});
