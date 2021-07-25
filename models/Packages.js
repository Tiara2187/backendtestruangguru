const mongoose = require('mongoose')

const packagesSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    packageSerial: {
        type: String,
        required: true
    },

    packageTag: {
        type: String,
        required: true
    },

    orderStatus: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Packages', packagesSchema)