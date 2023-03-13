const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName:String,
    price:Number
})

const ProductModel = mongoose.model("products",productSchema)


module.exports={
    ProductModel
}