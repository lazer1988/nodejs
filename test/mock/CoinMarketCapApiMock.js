const CoinMarketCapApi = require('./../../src/BitcoinApi/CoinMarketCapApi');

class CoinMarketCapApiMock extends CoinMarketCapApi{

    update(){
        this.price = 6324.231;
        this.trigger('updated');
    }

}


module.exports = CoinMarketCapApiMock;
