const AbstractApi = require('./AbstractApi');
const WebSocket = require('ws');
const crypto = require('crypto');

class CexIOApi extends AbstractApi {
    constructor(){
        super();

        this.price = 0;

        this.apiKey = '56AjQfv7n2HGZNVmAwYzHgoIzwM';
        this.apiSecret = '7QKuS3yQpwoGOWemk1kkgnyCK9Q';

        console.log('init CexIOApi');
    }

    url(){
        return 'wss://ws.cex.io/ws/';
    }

    getPrice(){
        return this.price;
    }

    updatePrice(){
        var ws = new WebSocket(this.url());
        var $this = this;

        ws.on('open', () => {
            ws.send($this.createAuthRequest());
            console.log('CexIOApi WebSocket connected');
        });

        ws.on('message', message => {
            let response = JSON.parse(message);

            switch (response.e) {
                case 'auth':
                    if (response.ok == 'ok') {
                        ws.send('{"e":"subscribe","rooms":["tickers"]}');
                        console.log('CexIOApi auth success');
                    } else {
                        throw new Error("cex.io auth has fail check your api keys");
                    }
                    break;
                case 'ping':
                    ws.send('{"e":"pong"}');
                    break;
                case 'tick':
                    if (response.data.symbol1 == 'BTC' && response.data.symbol2 == 'USD') {
                        $this.price = response.data.price;
                        $this.trigger('updated');
                    }
                    break;
            }
        });
    }

    createSignature(timestamp, apiKey, apiSecret){
        let hmac = crypto.createHmac('sha256', apiSecret );
        hmac.update( timestamp + apiKey );

        return hmac.digest('hex');
    }

    createAuthRequest(){
        let timestamp = Math.floor(Date.now() / 1000);  // Note: java and javascript timestamp presented in miliseconds
        let args = { e: 'auth', auth: { key: this.apiKey,
                signature: this.createSignature(timestamp, this.apiKey, this.apiSecret), timestamp: timestamp } };
        let authMessage = JSON.stringify( args );

        return authMessage;
    }
}

module.exports = CexIOApi;
