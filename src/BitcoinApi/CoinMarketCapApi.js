const AbstractApi = require('./AbstractApi');
const https = require('https');

class CoinMarketCapApi extends AbstractApi {
    constructor(){
        super();

        this.price = 0;

        console.log('init CoinMarketCapApi');
    }

    url(){
        return 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';
    }

    getPrice(){
        return this.price;
    }

    updatePrice(){
        this._makeRequest();

        setInterval(() => this._makeRequest(), this.config.updateTime * 1000);
    }

    _makeRequest(){
        var $this = this;

        https.get(this.url(), response => {
            var body = '';
            response.on('data', d => {
                body += d;
            });
            response.on('end', () => {
                let parsed = JSON.parse(body);

                $this.price = parsed[0].price_usd;
                $this.trigger('updated');
            });
        });
    }
}

module.exports = CoinMarketCapApi;
