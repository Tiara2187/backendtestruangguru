const Product = require('../models/Product')

class ProductController {
    static async createProduct(req, res, next){
        const{
            productName,
            productTag,
            eligibleUser,
            productStatus
        } = req.body
        const productData = await Product.findOne({
            productName : productName,
            productTag: productTag,
            eligibleUser: eligibleUser,
            productStatus: productStatus

        });
        console.log(productData);
        if(productData) { next({name: 'PRODUCTNEXT'}) }
        else{
            const product = new Product({
                productName,
                productTag,
                eligibleUser,
                productStatus
            })
            product.save()
            .then(data => {
                res.status(200).json({success : true, data})
            })
            .catch(err => {next({name: 'VALID'})})
        }
    }

    static async listProduct(req, res, next){
        try{
            const product = await Product.find()
            res.status(200).json({success : true, data : product})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async detailProduct(req, res, next)
    {
        const {productId} = req.params
        try{
            const product = await Product.findById(productId)
            res.status(200).json({success : true, msg : product})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async updatedProduct(req, res, next)
    {
        const {productId} = req.params
        const {
            productName,
            productTag,
            eligibleUser,
            productStatus

        } = req.body
        try{
            const newData = {
                productName,
                productTag,
                eligibleUser,
                productStatus
            }
            for(let key in newData) if(!newData[key]) delete newData[key]
            const product = await Product.findByIdAndUpdate(productId,newData,{new: true})
            res.status(200).json({success : true, data : product})
        }
        catch (e) { next({name: 'PRODUCT_NOT_FOUND'})}

    }

    static async deleteProduct(req, res, next){
        const { productId} = req.params
        try{
            const product = await Product.findByIdAndDelete(productId)
            res.status(200).json({success : true, message : 'delete success' })
        }
        catch (e) { next({name: 'PRODUCT_NOT_FOUND'})}
    }
}

module.exports = ProductController