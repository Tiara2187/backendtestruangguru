const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true, partialFilterExpression: {email: {$exists:true }},
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
     contactnumber : {
        type : String,
        unique:true,
        required: true,
        maxlength: 20,
        validate : [/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/, 'please fill valid phone']
    },
    contactperson : {
        type : String,
        unique:true,
        required: true,
        maxlength: 20,
        validate : [/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/, 'please fill valid phone']
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)


