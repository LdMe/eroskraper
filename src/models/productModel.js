import mongoose from "mongoose";
import db from "../config/db.js";
/**
 * @module models/productModel
 */
/**
 * Modelo de producto para la base de datos de MongoDB
 * @typedef {Object} ProductModel
 * @property {String} nombre nombre o título del producto
 * @property {String} imagen url de la imagen del producto
 * @property {Number} precio precio del producto
 */
/**
 * @type {mongoose.Schema}
 */

const productSchema = new mongoose.Schema({
    nombre: String,
    imagen: String,
    precio: Number
})

const Product = mongoose.model("Product",productSchema);

export default Product;