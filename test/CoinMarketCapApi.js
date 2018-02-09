require('colors'); // color output in console
const CoinMarketCapApi = require('./../src/BitcoinApi/CoinMarketCapApi');

describe('CoinMarketCapApi#_makeRequest()', function(){
    it('should done without error and return price', function(done){
        let api = new CoinMarketCapApi();
        api.on('updated', function() {
            if (!isNaN(parseFloat(this.getPrice())) && isFinite(this.getPrice())) {
                done();
            }
        });
        
        api._makeRequest();
    });
});
