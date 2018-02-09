const AbstractApi = require('./../BitcoinApi/AbstractApi');
const Config = require('./../../config/Config');
const moment = require('moment');

class App{
    constructor(mainApi, compareApi){
        if (!(mainApi instanceof AbstractApi)) {
            throw new Error("mainApi has to be instanceof AbstractApi");
        }

        if (!(compareApi instanceof AbstractApi)) {
            throw new Error("compareApi has to be instanceof AbstractApi");
        }

        this.priceDiff = null;

        this.mainApi = mainApi;
        this.compareApi = compareApi;
    }

    run(){
        var $this = this;

        this.mainApi.updatePrice();
        this.mainApi.on('updated', () => $this.comparePrices());

        this.compareApi.updatePrice();
        this.compareApi.on('updated', () => $this.comparePrices());
    }

    comparePrices(){
        if (this.mainApi.getPrice() === 0 || this.compareApi.getPrice() === 0) {
            return;
        }

        let percent = parseFloat((this.mainApi.getPrice()*100/this.compareApi.getPrice()) - 100).toFixed(Config.symbolsAfterComma);

        if (this.priceDiff !== percent) {
            this.priceDiff = percent;

            console.log('price diff ' + this.priceDiff + '%, time - ' + moment().format(Config.dateFormat));
        }
    }
}

module.exports = App;
