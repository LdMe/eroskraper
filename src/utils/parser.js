import {JSDOM} from "jsdom";
class Parser{
    constructor(html){
        this.html = html;
        this.dom = new JSDOM(html);
    }

    getListSection(){
        const result = this.dom.window.document.querySelector(".product-lineal-content");
        return result;
    }

    getItems(section){
        const results = section.querySelectorAll(".product-item");
        const resultsArray = Array.from(results);
        return resultsArray;
    }
}

export default Parser;