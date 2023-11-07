import mongoose from "mongoose";
import db from "../config/db.js";

const productSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number
})

const Product = mongoose.model("Product",productSchema);

export default Product;