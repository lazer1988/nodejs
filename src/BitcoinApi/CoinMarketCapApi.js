const AbstractApi = require('./AbstractApi');
const https = require('https');

class CoinMarketCapApi extends AbstractApi {
    constructor(){
        super();

        this.price = 0;

        console.log('init'.green+' CoinMarketCapApi');
    }

    /**
     * @inheritDoc
     */
    url(){
        return 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';
    }

    /**
     * @inheritDoc
     */
    getPrice(){
        return this.price;
    }

    /**
     * @inheritDoc
     */
    update(){
        this._makeRequest();

        setInterval(() => this._makeRequest(), this.config.updateTime * 1000);
    }

    _makeRequest(){
        https.get(this.url(), response => {
            var body = '';
            response.on('data', d => {
                body += d;
            });
            response.on('end', () => {
                try {
                    let parsed = JSON.parse(body);

                    this.price = parsed[0].price_usd;
                    this.trigger('updated');
                } catch (e) {
                    console.log((e.name+': '+e.message).red);
                }
            });
        });
    }
}

module.exports = CoinMarketCapApi;
