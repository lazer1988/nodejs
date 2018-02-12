const CexIOApi = require('./../../src/BitcoinApi/CexIOApi');

class CexIOApiMock extends CexIOApi{
    url() {
        return null;
    }

    update(){
        super.update();

        this.getWSClient().emit('message', '{"e":"tick","data":{"symbol1":"BTC","symbol2":"USD","price":"6438.877","open24":"8230","volume":"2076.43387370"}}');
    }
}

module.exports = CexIOApiMock;
