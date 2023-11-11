

class Product {
    constructor(nombre,descripcion,precio){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

function createProduct(nombre,descripcion,precio){
    return new Product(nombre,descripcion,precio);
}
const newProduct = new Product("Aifon","Coges el movris y lo tiras",5000);
const newProduct2 = createProduct("Aifon","Coges el movris y lo tiras",5000);