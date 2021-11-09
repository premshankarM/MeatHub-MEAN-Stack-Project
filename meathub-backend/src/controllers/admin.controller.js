import adminModel from '../models/admin.model'
import bcrypt from 'bcryptjs'
import config from '../configs/config'
import jwt from 'jsonwebtoken'

class AdminController{

    login(req){
    return new Promise((resolve, reject) => {
        adminModel.findOne({
            where:{admin_email:req.body.email}
        })
        .then((result) => {
            if(result){
                if(bcrypt.compareSync(req.body.password,result.admin_password)){
                    var payload={
                        admin_name:result.admin_name,
                        admin_email:result.admin_email,
                        admin_mobile:result.admin_mobile
                    }
                    var token=jwt.sign(payload,config.secret_key,{expiresIn:"10h"})
                    resolve([{admin_name:result.admin_name,token},"Success"])
                }
                else{
                    reject([400,"Please check the password"])
                }
            }
            else{
                reject([404,"No such admin account"])
            }
        }).catch((err) => {
            reject([500,{msg:"Server problem",err:err}])
        });
    });    
}
}
 export default new AdminController()