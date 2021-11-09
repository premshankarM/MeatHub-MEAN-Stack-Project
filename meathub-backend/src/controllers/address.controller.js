import addressModel from '../models/address.model'

class AdressController{
    
    constructer(){

    }
    getCustAddress(req){
        return new Promise((resolve, reject) => {
            addressModel.findAll({where:{user_id:req.decoded_token.id}})
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:"Internel Error",error:err}])
            });    
        });
    }
    getCustOneAddress(req){
        return new Promise((resolve, reject) => {
            addressModel.findOne({where:{id:req.body.adds_id}})
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:"Internel Error",error:err}])
            });    
        });
    }
    addCustAddress(req){
        return new Promise((resolve, reject) => {
            addressModel.create({
                address_name:req.body.addr_name,
                house_no:req.body.house_flat_no,
                area_locality:req.body.area_locality,
                landmark:req.body.landmark,
                user_id:req.decoded_token.id
            })
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:"Internel Error",error:err}])
            });
        });
        
    }
    editOneAddress(req){
        return new Promise((resolve, reject) => {
            addressModel.update({
                address_name:req.body.addr_name,
                house_no:req.body.house_flat_no,
                area_locality:req.body.area_locality,
                landmark:req.body.landmark,
            },{where:{id:req.body.adds_id}})
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:"Internel Error",error:err}])
            });
        });
    }
    deleteAddress(req){
        return new Promise((resolve, reject) => {
            addressModel.destroy({where:{id:req.body.adds_id}})
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:"Internel Error",error:err}])
            });
        });
    }
}

export default new AdressController();