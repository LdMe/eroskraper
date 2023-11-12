import puppeteer from 'puppeteer';
export default class Scraper{
    constructor(){
        this.isReady = false;
        this.browser = null;
        this.promise = this.init();
    }
    async init(){
        this.browser = await puppeteer.launch();
        this.isReady = true;
    }
    
}