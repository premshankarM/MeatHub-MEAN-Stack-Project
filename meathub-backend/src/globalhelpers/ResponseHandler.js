class ResponseHandler {

    handleResponse(res,data=null,message){
        let responseJSON = {};
        if(data)
        responseJSON.data = data;
        responseJSON.message = message;
        if(!res.headersSent){
            res.status(200).json(responseJSON);
        }
    }

    handleErrorResponse(res,status,error){
        console.log("API Error",error);
        let responseJSON = {};
        if(typeof error == "string"){
            responseJSON.message = error;
        }else{
            responseJSON.message = error.msg;
        }
        if(!res.headersSent){
            res.status(status).json(responseJSON);
        }
    }

}

export default new ResponseHandler();