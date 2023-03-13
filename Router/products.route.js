const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const { authorise } = require("../middleware/authorise");
const { ProductModel } = require("../Models/productsModel");
const productRouter = express.Router();


productRouter.get("/allPRoducts",(req,res)=>{
    res.send("Show All Products")
})

productRouter.get("/products",authenticate,(req,res)=>{
    res.send("protected products")
})

productRouter.post("/addproducts",authenticate,authorise(["seller"]),async(req,res)=>{
    const {productName,price}= req.body;
    try {
        const product = new ProductModel({
            productName,
            price
        })
        await product.save();
        res.send("product Added")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while Adding Product")
    }
})

productRouter.delete("/deleteproducts/:id",authenticate,authorise(["seller"]),async(req,res)=>{
    const id = req.params.id;
    try {
        const product = await ProductModel.findByIdAndDelete({_id:id})
        res.send("product deleted")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while deleting the Product")
    }
})


module.exports={
    productRouter
}