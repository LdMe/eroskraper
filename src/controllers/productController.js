import Product from '../models/productModel.js';
import Scraper from '../utils/scraper.js';
import Parser from '../utils/parser.js';


/**
 * 
 * @module controllers/productController
 */

/**
 * 
 * Conseguir todos los productos
 * @returns {Promise<Product[]>} Array de productos
 */
const getAllProducts =  () => {
    return  Product.find();
}

/**
 * Conseguir un producto por id
 * @param {String} id id del producto
 * @returns {Promise<Product>} Producto
 * @example 
 * let product = getProductById(1);
 */
const getProductById = (id) => {
    return Product.findById(id);
}

/**
 * Crear un producto nuevo
 * @param {String} nombre
 * @param {String} imagen
 * @param {Number} precio
 * @returns {Promise<Product>} Producto creado
 */
const createProduct = async(nombre, imagen, precio) => {
    const newProduct = {
        nombre,
        imagen,
        precio
    };
    const product =new Product(newProduct);
    await product.save();
    return product;

}

/**
 * Editar un producto por id
 * @param {String} id
 * @param {String} nombre
 * @param {String} imagen
 * @param {Number} precio
 * @returns {Promise<Product>} Producto editado
 */
const updateProduct = async (id, nombre, imagen, precio) => {
    const product = await getProductById(id);
    product.nombre = nombre;
    product.imagen = imagen;
    product.precio = precio;
    product.save();
    return product;
}

/**
 * Borrar un producto por id
 * @param {String} id
 * @returns {Promise<Product>} Producto borrado
 */
const deleteProduct = async(id) => {
    const product = await getProductById(id);
    await Product.deleteOne({_id: id});
    return product;
}

/**
 * 'Scrapear' los productos de eroski y los guarda en la base de datos
 * @returns {Promise<void>} 
 */
const scrapProducts = async() =>{
    const url = "https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059872-fiambres-y-cocidos/";
    const scraper = new Scraper();
    await scraper.promise;
    const html = await scraper.getHtml(url);

    const parser = new Parser(html);
    const products = parser.getProducts();

    for (let product of products) {
        await createProduct(product.nombre,product.imagen,product.precio);
    }
    scraper.close();    
}


export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    scrapProducts
}