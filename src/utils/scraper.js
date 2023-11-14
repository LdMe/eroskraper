import puppeteer from 'puppeteer';

/**
 * Clase que interactúa con el navegador y consigue el html de una url
 * @class Scraper
 * @property {Boolean} isReady Si el navegador está listo
 * @property {Browser} browser El navegador
 * @property {Promise} promise La promesa de inicialización del navegador
 */
class Scraper{
    /**
     * @constructor
     */
    constructor(){
        this.isReady = false;
        this.browser = null;
        this.promise = this.init();
    }
    /**
     * Inicializa el navegador
     * @returns {Promise<void>}
     */
    async init(){
        this.browser = await puppeteer.launch({
            headless:true,
            args:["--no-sandbox"]
        });
        this.isReady = true;
    }

    /**
     * Cierra el navegador
     * @returns {Promise<void>}
     */
    async close(){
        this.browser.close();
    }

    /**
     * Consigue el html de una url
     * @param {String} url
     * @returns {Promise<String>} Html de la url
     */
    async getHtml(url){
        await this.promise;
        const page = await this.browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await page.close();
        return html;
    }

}

export default Scraper;