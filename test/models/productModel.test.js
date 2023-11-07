import Product from "../../src/models/productModel.js";
import mongoose from "mongoose";

describe("Tests de modelo de producto",() => {
    let id = null;
    const nombre="Aifon";
    const descripcion="Coges el movris y lo tiras";
    const precio = 5000;

    afterAll(async()=>{
        await mongoose.disconnect();
    })
    test("Crear un producto nuevo",async () => {
        const producto = await Product.create({nombre,descripcion,precio});
        expect(producto).not.toBeUndefined();
        expect(producto).not.toBeNull();
        expect(producto.nombre).toEqual(nombre);
        expect(producto.descripcion).toEqual(descripcion);
        expect(producto.precio).toEqual(precio);
        id = producto._id;
    });

    test("Conseguir todos los productos",async()=>{
        const productos = await Product.find();
        expect(productos.length).toBeGreaterThan(0);
        expect(productos[0]).toHaveProperty("nombre");
        expect(productos[0]).toHaveProperty("descripcion");
        expect(productos[0]).toHaveProperty("precio");
    })

    test("Conseguir un producto por id", async()=>{
        const producto = await Product.findOne({_id:id});
        expect(producto).not.toBeUndefined();
        expect(producto).not.toBeNull();
        expect(producto.nombre).toEqual(nombre);
        expect(producto.descripcion).toEqual(descripcion);
        expect(producto.precio).toEqual(precio);
    })

    test("Editar un producto por id",async()=>{
        const producto = await Product.findOne({_id:id});
        producto.nombre="Anderoid";
        producto.precio=9999;
        await producto.save();
        const productoNuevo =  await Product.findOne({_id:id});
        expect(productoNuevo).not.toBeUndefined();
        expect(productoNuevo).not.toBeNull();
        expect(productoNuevo.nombre).toEqual("Anderoid");
        expect(productoNuevo.descripcion).toEqual(descripcion);
        expect(productoNuevo.precio).toEqual(9999);
    })

    test("Borrar un producto por id",async()=>{
        await Product.deleteOne({_id:id});
        const oldProduct = await Product.findOne({_id:id});
        expect(oldProduct).toBeNull();

    })


})