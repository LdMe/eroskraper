import Product from '../models/productModel.js';

const getAllProducts =  () => {
    return  Product.find();
}

const getProductById = (id) => {
    return Product.findById(id);
}

const createProduct = async(nombre, descripcion, precio) => {
    const newProduct = {
        nombre,
        descripcion,
        precio
    };
    const product =new Product(newProduct);
    await product.save();
    return product;

}

const updateProduct = async (id, nombre, descripcion, precio) => {
    const product = await getProductById(id);
    product.nombre = nombre;
    product.descripcion = descripcion;
    product.precio = precio;
    product.save();
    return product;
}

const deleteProduct = async(id) => {
    const product = await getProductById(id);
    await Product.deleteOne({_id: id});
    return product;
}


export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
