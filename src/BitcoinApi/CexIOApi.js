const AbstractApi = require('./AbstractApi');
const WebSocket = require('ws');
const crypto = require('crypto');

class CexIOApi extends AbstractApi {
    constructor(){
        super();

        this.apiKey = '56AjQfv7n2HGZNVmAwYzHgoIzwM';
        this.apiSecret = '7QKuS3yQpwoGOWemk1kkgnyCK9Q';
    }

    url(){
        return 'qweqwe';
    }

    getPrice(){
        return 22;
    }

    updatePrice(){
        var ws = new WebSocket("wss://ws.cex.io/ws/");
        var $this = this;

        ws.on('open', function(){
            ws.send($this.createAuthRequest());
        });

        ws.on('message', function(message){
            console.log(message);
            let data = JSON.parse(message);

            switch (data.e) {
                case 'auth':

                    break;
                case 'ping':
                    ws.send('{"e":"pong"}');
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
