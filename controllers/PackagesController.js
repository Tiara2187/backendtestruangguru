const Packages = require('../models/Packages')

class PackagesController {
    static async createPackages(req, res, next){
        const {packageSerial, packageTag, orderStatus, packageName} = req.body
        const packagesData = await Packages.findOne({
            packageSerial : packageSerial,
            packageTag: packageTag,
            orderStatus: orderStatus,
            packageName: packageName
        })
        console.log(packagesData)
        if(packagesData) { next({name: 'PACKAGESNEXT'}) }
        else{
            const packages = new Packages({
                packageSerial,
                packageTag,
                orderStatus,
                packageName
            });
            packages.save()
            .then(data => {
                res.status(200).json({success : true, data})
            })
            .catch(err => {next({name: 'VALID'})})
        }
    }

    static async listPackages(req, res, next){
        try{
            const packages = await Packages.find()
            res.status(200).json({success : true, data: packages})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async detailPackages(req, res, next)
    {
        const {packagesId} = req.params
        try{
            const packages = await Packages.findById(packagesId)
            res.status(200).json({success : true, data : packages})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async updatedPackages(req, res, next){
        const {packagesId} = req.params
        const {
            packageName,
            packageSerial,
            packageTag,
            orderStatus
        } = req.body
        try{
            const newData = {
                packageName,
                packageSerial,
                packageTag,
                orderStatus
            }
            for(let key in newData) if(!newData[key]) delete newData[key]
            const packages = await Packages.findByIdAndUpdate(packagesId,newData,{new: true})
            res.status(200).json({success : true, data : packages})
        }
        catch (e) { next({name: 'PACKAGESNOTFOUND'})}
    }

    static async deletePackages(req, res, next){
        const {packagesId} = req.params
        try{
            const packages = await Packages.findByIdAndDelete(packagesId)
            res.status(200).json({success : true, message : 'delete success' })
        }
        catch(e) { next({name: 'PACKAGESNOTFOUND'})}
    }
}

module.exports = PackagesController