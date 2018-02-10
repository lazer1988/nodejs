const CexIOApi = require('./../../src/BitcoinApi/CexIOApi');

class CexIOApiMock extends CexIOApi{

    update(){
        this.price = 6438.877;
        this.trigger('updated');
    }

}

module.exports = CexIOApiMock;
