const AbstractApi = require('./AbstractApi');
const WebSocket = require('ws');
const crypto = require('crypto');

class CexIOApi extends AbstractApi {
    constructor(){
        super();

        this.ws = null; // web socket
        this.price = 0;

        this.apiKey = '56AjQfv7n2HGZNVmAwYzHgoIzwM';
        this.apiSecret = '7QKuS3yQpwoGOWemk1kkgnyCK9Q';

        console.log('init'.green+' CexIOApi');
    }

    /**
     * @inheritDoc
     */
    url(){
        return 'wss://ws.cex.io/ws/';
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
        this.ws = new WebSocket(this.url());

        this.ws.on('open', () => {
            this.ws.send(this.createAuthRequest());
            console.log('CexIOApi WebSocket '+'connected'.green);
        });

        this.ws.on('message', message => {
            let response;

            try {
                response = JSON.parse(message);
            } catch (e) {
                console.log((e.name+': '+e.message).red);
            }

            switch (response.e) {
                case 'auth':
                    if (response.ok == 'ok') {
                        this.ws.send('{"e":"subscribe","rooms":["tickers"]}');
                        console.log('CexIOApi auth '+'success'.green);
                    } else {
                        throw new Error("cex.io auth has fail check your api keys");
                    }
                    break;
                case 'ping':
                    this.ws.send('{"e":"pong"}');
                    break;
                case 'tick':
                    if (response.data.symbol1 == 'BTC' && response.data.symbol2 == 'USD') {
                        this.price = response.data.price;
                        this.trigger('updated');
                    }
                    break;
            }
        });
    }

    closeWS(){
        if (this.ws) {
            this.ws.terminate();
        }
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
