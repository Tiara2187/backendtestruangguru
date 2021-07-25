const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AdminController {
    static register(req, res, next) {
        const { username, password, email, phone } = req.body
        Admin.create({ username, password, email, phone })
        .then(admin => {
            res.status(200).json({ success: true, data: admin})
        })
        .catch(next)
    }

    static login(req, res, next){
        const { email, password } = req.body
        Admin.findOne({ email : email })
        .then(admin => {
            if (admin && bcrypt.compareSync(password, admin.password)) {
                const token = jwt.sign({_id : admin._id}, 'RUANGGURU')
                res.status(200).send({ success: true, admin, token})
            }
            else if(!admin) {next({name: 'NOT_FOUND'})}
            else next({name : 'LOGIN_FAILED'})
        })
        .catch(e => {next({name: `NOT_FOUND`})})
    }

    static async getAdmin(req, res, next) {
        try{
       const getAdmin = await User.find()
       res.status(200).send({success: true, data : getAdmin})
        }
        catch(e) { next({name: 'NOT_FOUND'}) }
   }

   
   static async listAdmin(req, res, next){
    try{
        const admin = await Admin.find()
        res.status(200).json({success : true, data: admin})
    }
    catch (any) { next({name: 'NOT_FOUND'})}
}






}
module.exports = AdminController