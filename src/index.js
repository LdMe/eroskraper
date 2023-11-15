import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import cors from "cors";
import productController from "./controllers/productController.js";
import authController from "./controllers/authController.js";

import { isLoggedIn } from "./middlewares/authMiddleware.js";

const swaggerJson = JSON.parse(
    fs.readFileSync(`${path.resolve()}/openapi.json`, "utf-8")
  );

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
// poner en marcha el swagger con el archivo openapi.json en la raíz del proyecto
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerJson));
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