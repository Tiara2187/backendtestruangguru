const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productTag: {
        type: String,
        required: true
    },

    eligibleUser: {
        type: String,
        required: true
    },

    productStatus: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)