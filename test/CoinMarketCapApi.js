require('colors'); // color output in console
const CoinMarketCapApi = require('./../src/BitcoinApi/CoinMarketCapApi');

describe('CoinMarketCapApi#_makeRequest()', function(){
    it('should done without error and return price', function(done){
        let api = new CoinMarketCapApi();
        api.on('updated', function() {
            if (!isNaN(parseFloat(this.getPrice())) && isFinite(this.getPrice()) && this.getPrice() > 0) {
                done();
            }
        });

        api._makeRequest();
    });
});
