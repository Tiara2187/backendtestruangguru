const User = require('../models/User')

class UserController {
    static async createUser(req, res, next){
        const{
            username,
            email,
            contactnumber,
            contactperson
        } = req.body
        const userData = await User.findOne({
            username : username,
            email: email,
            contactnumber: contactnumber,
            contactperson: contactperson

        });
        console.log(userData);
        if(userData) { next({name: 'USERNOTFOUND'})}
        else{
            const user = new User({
                username,
                email,
                contactnumber,
                contactperson
            })
            user.save()
            .then(data => {
                res.status(200).json({success : true, data})
            })
            .catch(err => {next({name: 'VALID'})})
        }
    }

    static async listUser(req, res, next) {
        try{
            const user = await User.find()
            .populate('product')
            res.status(200).json({success : true, data : user})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async detailUser(req, res, next) {
        const {userId} = req.params
        try{
            const user = await User.findById(userId)
            .populate('product')
            res.status(200).json({success : true, msg : user})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async updatedUser(req, res, next)
    {
        const {userId} = req.params
        const {
            username,
            email,
            contactnumber,
            contactperson,
            product
        } = req.body
        try{
            const newData = {
                username,
                email,
                contactnumber,
                contactperson,
                product
            }
        for(let key in newData) if(!newData[key]) delete newData[key]
        const user = await User.findByIdAndUpdate(userId,newData,{new: true})
        res.status(200).json({success : true, data : user})
    }
    catch (e) { next ({name: 'USER_NOT_FOUND'})}
    }

    static async deleteUser(req, res, next){
        const { userId} = req.params
        try{
            const user = await User.findByIdAndDelete(userId)
            res.status(200).json({success : true, message: 'delete success'})

        }
        catch (e) { next({name: 'USER_NOT_FOUND'})}
    }
}

module.exports = UserController