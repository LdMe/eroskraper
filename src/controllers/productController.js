
const products =[
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
let nextId = 5;
const getAllProducts = () => {
    return products;
}

const getProductById = (id) => {
    return products.find(product => product.id === id) || null;
}

const createProduct = (name, description, price) => {
    const newProduct = {
        id: nextId,
        name,
        description,
        price
    };
    nextId++;
    products.push(newProduct);
    return newProduct;
}

const updateProduct = (id, name, description, price) => {
    const product = products.find(product => product.id === id);
    product.name = name;
    product.description = description;
    product.price = price;
    return product;
}

const deleteProduct = (id) => {
    const index = products.findIndex(product => product.id === id);
    products.splice(index, 1);
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
