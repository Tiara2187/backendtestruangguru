const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const adminAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if(token){
      jwt.verify(token, 'RUANGGURU',(err,decoded) => {
        if(err) next({name: 'INVALID_TOKEN'})
        else{
          req._adminId = decoded._id;
          next()
        }
      })
    }else next({name : 'MISSING_TOKEN'})

}
module.exports = adminAuth