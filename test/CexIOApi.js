require('colors'); // color output in console
const CexIOApi = require('./../src/BitcoinApi/CexIOApi');

describe('CexIOApi#update()', function(){
    it('should done without error and return price', function(done){
        this.timeout(60000);

        let api = new CexIOApi();
        api.on('updated', function() {
            this.closeWS();

            if (!isNaN(parseFloat(this.getPrice())) && isFinite(this.getPrice())) {
                done();
            }
        });

        api.update();
    });
});
