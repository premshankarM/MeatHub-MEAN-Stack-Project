import Category from '../models/category.model'
import UploadService from '../services/UploadService';
import config from '../configs/config';

class CategoryController{
     
    getCategories(req){
        return new Promise((resolve, reject) => {
            Category.findAll()
            .then((result) => {
               resolve([result,"Success"]) 
            }).catch((err) => {
                reject([500,{msg:'Internal Error',error:err}])
            });
        });
    }
    addCategory(req){
        return new Promise((resolve, reject) => {
            const uploadObj = UploadService.uploadSingleFile();
            const upload = uploadObj.single("image")
            upload(req, null, function (err) {
                if (err) {
                  reject([400, { msg: 'Error while uploading asset', error: err }])
                }
               Category.create({
                cat_name:req.body.catName,
                cat_image:config.static_path+req.file.filename,
                cat_desc:req.body.description
            })
            .then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:'Internal Error',error:err}])
            });
                
            })
        });
    }
    findOneCat(req){
        return new Promise((resolve, reject) => {
            
            Category.findOne({where:{id:req.query.catId}})
            .then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:"Internal Error",error:err}])
            });
        });
    }
    updateCategory(req){
        return new Promise((resolve, reject) => {
            const uploadObj=UploadService.uploadSingleFile();
            const upload= uploadObj.single("image")
            upload(req,null,function(err){
                if (err) {
                    reject([400, { msg: 'Error while uploading asset', error: err }])
                  }
                  Category.update({
                    cat_name:req.body.catName,
                    cat_image:config.static_path+req.file.filename,
                    cat_desc:req.body.description
                },{
                    where:{id:req.body.catId}
                })
                .then((result) => {
                    resolve([result,"Success"])
                }).catch((err) => {
                    reject([500,{msg:'Internal Error',error:err}])
                });
            })
            
        });
    }
    deleteCategory(req){
        return new Promise((resolve, reject) => {
            Category.destroy({
                where:{id:req.body.cat_id}
            })
            .then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:'Internal Error',error:err}])
            });
        });
    }
}

export default new CategoryController()