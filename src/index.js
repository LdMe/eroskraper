import express from "express";

import productController from "./controllers/productController.js";
import authController from "./controllers/authController.js";

import { isLoggedIn } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get("/",async (req,res)=>{
    try{
        const products = await productController.getAllProducts();       
        res.json(products); 
    }
    catch(e){
        res.status(500).send("ha habido un error intentando conseguir los datos");
    }

})

app.post("/scrap",isLoggedIn,async (req,res)=>{
    try{
        await productController.scrapProducts();
        const products = await productController.getAllProducts();       
        res.json(products); 
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }

})

app.post("/login",authController.login);

app.post("/register",authController.register);


app.listen(3000,()=>{
    console.log("app en marcha en el puerto que sea")
})