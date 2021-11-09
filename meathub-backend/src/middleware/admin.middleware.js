import responseHandler from "../globalhelpers/ResponseHandler"
import JWT from 'jsonwebtoken';
import adminModel from "../models/admin.model";
import config from "../configs/config";
class AdminMiddleware {

    validateAuthToken(req,res,next){
        var token = req.headers["authorization"];
        if(token){
            var auth_token = token.slice(7);
            console.log(auth_token);
            
            JWT.verify(auth_token,config.secret_key,function(error,decoded_token){

                if(error)
                responseHandler.handleErrorResponse(res,401,"Not Authorized / Session expired");
                adminModel.findOne({
                    where:{admin_email:decoded_token.admin_email}
                }).then((result) => {
                    if(result){
                        req.decoded_token = decoded_token;
                        next();
                    }else{
                        responseHandler.handleErrorResponse(res,404,"Account doesnt exist");
                    }
                }).catch((err) => {
                    responseHandler.handleErrorResponse(res,500,{msg:'Internal error',error:err});
                });
            });
        }else{
            responseHandler.handleErrorResponse(res,400,"Please pass token");
        }
    }

}

export default new AdminMiddleware();