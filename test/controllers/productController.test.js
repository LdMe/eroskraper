import productController from "../../src/controllers/productController.js";

describe("Test de productController", function() {
    let productId = 0;
    test("Get all products", function() {
        const products = productController.getAllProducts();
        expect(products).toHaveLength(4);
    });

    test("Get product by id", function() {
        const id = 1;
        const product = productController.getProductById(id);
        expect(product).not.toBeNull();
        expect(product.id).toEqual(id);
        expect(product.name).toBe("Sagarra");
        expect(product.description).toBe("Manzana");
        expect(product.price).toBe(100);
    });

    test("Create product", function() {
        const name = "TestCreate";
        const description = "TestCreate";
        const price = 100;
        const product = productController.createProduct(name, description, price);
        productId = product.id;
        expect(product).not.toBeNull();
        expect(product.id).not.toBeNull();
        expect(product.name).toBe(name);
        expect(product.description).toBe(description);
        expect(product.price).toBe(price);
    });

    test("Update product", function() {
        const id = productId;
        const name = "TestUpdate";
        const description = "TestUpdate";
        const price = 200;
        const product = productController.updateProduct(id, name, description, price);
        expect(product).not.toBeNull();
        expect(product.id).toBe(id);
        expect(product.name).toBe(name);
        expect(product.description).toBe(description);
        expect(product.price).toBe(price);
    });

    test("Delete product", function() {
        const id = productId;
        productController.deleteProduct(id);
        const product = productController.getProductById(id);
        expect(product).toBeNull();
    });
}
);
