import subcategories from '../models/sub_category.model'
import categoryModel from '../models/category.model';
import config from '../configs/config'
import UploadService from '../services/UploadService'

class SubcategoriesController{
    getSubCategories(req){
        return new Promise((resolve, reject) => {
            subcategories.findAll({
                include:[categoryModel]
            })
            .then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:'Internal error',error:err}])
            });
        });
    }
    getCatSubCats(req){
        return new Promise((resolve, reject) => {
            subcategories.findAll({
                where:{category_id:req.body.cat_id}
            }).then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:'Internel error',error:err}])
            });
        });
    }
    addSubcategory(req){
        
        return new Promise((resolve, reject) => {
            const uploadObj = UploadService.uploadSingleFile();
            const upload = uploadObj.single("image")
            upload(req, null, function (err) {
                if (err) {
                  reject([400, { msg: 'Error while uploading asset', error: err }])
                }
            subcategories.create({
                sub_cat_name:req.body.subCatName,
                sub_cat_image:config.static_path+req.file.filename,
                sub_cat_desc:req.body.desc,
                rate_per_kg:req.body.rate,
                category_id:req.body.catId
            })
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:'Internal error',error:err}]) 
            });
        });
    });
    }
    findOneSubCat(req){
        return new Promise((resolve, reject) => {
            subcategories.findOne({
                where:{id:req.query.catId}
            }).then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:'Internel error',error:err}])
            });
        });
    }
    findOneSubCatPost(req){
        return new Promise((resolve, reject) => {
            subcategories.findOne({
                where:{id:req.body.catId}
            }).then((result) => {
                resolve([result,"Success"])
            }).catch((err) => {
                reject([500,{msg:'Internel error',error:err}])
            });
        });
    }
    updateSubcategory(req){
        return new Promise((resolve, reject) => {
            const uploadObj = UploadService.uploadSingleFile();
            const upload = uploadObj.single("image")
            upload(req, null, function (err) {
                if (err) {
                  reject([400, { msg: 'Error while uploading asset', error: err }])
                }
            subcategories.update({
                sub_cat_name:req.body.subCatName,
                sub_cat_image:config.static_path+req.file.filename,
                sub_cat_desc:req.body.desc,
                rate_per_kg:req.body.rate,
                category_id:req.body.category_id
            },{
                where:{id:req.body.catId}
            })
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:'Internal error',error:err}]) 
            });
        });
    });
    }
    deleteSubcategory(req){
        return new Promise((resolve, reject) => {
            subcategories.destroy({
                where:{id:req.params.cat_id}
            })
            .then((result) => {
                resolve([result,"Sucess"])
            }).catch((err) => {
                reject([500,{msg:'Internal error',error:err}]) 
            });
        });
    }
}

export default new SubcategoriesController()