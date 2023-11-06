import Product from '../models/productModel.js';
/* const products =[
    {
        id: 1,
        name: 'Sagarra',
        description: 'Manzana',
        price: 100
    },
    {
        id: 2,
        name: 'Ikatza',
        description: 'Carbón',
        price: 85
    },
    {
        id: 3,
        name: 'Mujer',
        description: 'Andria',
        price: 154
    },
    {
        id: 4,
        name: 'Hombre',
        description: 'Gizon',
        price: 154
    }
];
let nextId = 5; */


const getAllProducts =  () => {
    return  Product.find();
}

const getProductById = (id) => {
    return Product.findById(id);
}

const createProduct = async(name, description, price) => {
    const newProduct = {
        name,
        description,
        price
    };
    const product =new Product(newProduct);
    return product.save();

}

const updateProduct = async (id, name, description, price) => {
    const product = await getProductById(id);
    product.name = name;
    product.description = description;
    product.price = price;
    product.save();
    return product;
}

const deleteProduct = async(id) => {
    const product = await getProductById(id);
    product.remove();
    return product;
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
