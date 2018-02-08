const config = require('../../config/Config');

class AbstractApi {
    constructor(){
        this.config = config;

        this.subscribers = {};
    }

    url(){
        throw new Error('method not implemented');
    }

    getPrice(){
        throw new Error('method not implemented');
    }

    on(eventName, subscriber){
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }

        if (typeof(subscriber) === 'function' && this.subscribers[eventName].indexOf(subscriber) === -1) {
            this.subscribers[eventName].push(subscriber);
        }
    }

    trigger(eventName){
        if (this.subscribers[eventName]) {
            for (let subscriber of this.subscribers[eventName]) {
                subscriber.call(this);
            }
        }
    }
}

module.exports = AbstractApi;
