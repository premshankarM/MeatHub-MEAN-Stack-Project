import userModel from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../configs/config'

class UserController{

    loginCust(req){
        console.log("Called");
        
        return new Promise((resolve, reject) => {
            userModel.findOne({where:{user_mobile:req.body.mobile}})
            .then((result) => {
                if(result){
                    if(bcrypt.compareSync(req.body.password,result.password)){
                        var payload={
                            id:result.id,
                            user_name:result.user_name,
                            user_mobile:result.user_mobile,
                            user_email:result.user_email
                        }
                        var token=jwt.sign(payload,config.secret_key,{expiresIn:"10h"})
                        resolve([{user_mobile:result.user_mobile,token},"Success"])
                    }
                    else{
                        reject([400,"wrong password"])
                    }
                }
                else{
                    reject([404,"No Such user"])
                }
            }).catch((err) => {
                reject([500,{msg:"Server Problem",error:err}])
            });
        });
    }
    getCustProfile(req){
        return new Promise((resolve, reject) => {
            userModel.findOne({
                where:{id:req.decoded_token.id},
                attributes:{
                    exclude:['password']
                }
            })
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:"Internal Eroror",error:err}])
            });
        });
    }
    updateCustProfile(req){
        return new Promise((resolve, reject) => {
            userModel.update({
                user_name:req.body.name,
                user_email:req.body.email
            },{where:{id:req.decoded_token.id}})
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:"Internal Eroror",error:err}])
            });
        });
    }
    createCustProfile(req){
        return new Promise((resolve, reject) => {
            userModel.create({
                user_name:req.body.name,
                user_mobile:req.body.mobile,
                user_email:req.body.email,
                password:bcrypt.hashSync(req.body.password, 10)
            })
            .then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:"Internal Error",error:err}])
            });
        });
    }
}

export default new UserController()