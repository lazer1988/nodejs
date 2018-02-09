const config = require('../../config/Config');

class AbstractApi {

    constructor(){
        this.config = config;

        this.subscribers = {};
    }

    /**
     * get api endpoint
     *
     * @return {string}
     */
    url(){
        throw new Error('url method not implemented');
    }

    /**
     * get bitcoin price
     *
     * @return {number}
     */
    getPrice(){
        throw new Error('getPrice method not implemented');
    }

    /**
     * update data
     */
    update(){
        throw new Error('updatePrice method not implemented');
    }

    /**
     * Subscribe to event
     *
     * @param {string}   eventName
     * @param {function} subscriber
     */
    on(eventName, subscriber){
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }

        if (typeof(subscriber) === 'function' && this.subscribers[eventName].indexOf(subscriber) === -1) {
            this.subscribers[eventName].push(subscriber);
        }
    }

    /**
     * trigger event
     *
     * @param {string} eventName
     */
    trigger(eventName){
        if (this.subscribers[eventName]) {
            for (let subscriber of this.subscribers[eventName]) {
                subscriber.call(this);
            }
        }
    }
}

module.exports = AbstractApi;
