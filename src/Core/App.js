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

        this.mainPrice = 0;
        this.comparePrice = 0;

        this.mainApi = mainApi;
        this.compareApi = compareApi;
    }

    run(){
        var $this = this;

        this.mainApi.updatePrice();
        this.mainApi.on('updated', function(){
            $this.mainPrice = $this.mainApi.getPrice();
            $this.comparePrices();
        });

        this.compareApi.updatePrice();
        this.compareApi.on('updated', function(){
            $this.comparePrice = $this.compareApi.getPrice();
            $this.comparePrices();
        });
    }

    comparePrices(){
        if (this.mainPrice === 0 || this.comparePrice === 0) {
            return;
        }

        let percent = parseFloat((this.mainPrice*100/this.comparePrice) - 100).toFixed(Config.symbolsAfterComma);

        if (this.priceDiff !== percent) {
            this.priceDiff = percent;

            console.log('price diff ' + this.priceDiff + '%, time - ' + moment().format(Config.dateFormat));
        }
    }
}

module.exports = App;
