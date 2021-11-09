import express from 'express'
import orderController from '../controllers/order.controller';
import ResponseHandler from '../globalhelpers/ResponseHandler';
import categoryController from '../controllers/category.controller';
import subcategoriesController from '../controllers/sub_category.controller'
import addressController from '../controllers/address.controller'
import userController from '../controllers/user.controller'
import authMiddleware from '../middleware/auth.middleware'

class AppRoutes{
    appRoutes;
    constructor(){
        this.appRoutes=express.Router()
        this.configAppRoutes()
    }
    configAppRoutes(){
        this.appRoutes.post('/login',this.login)
        this.appRoutes.post('/register',this.registerCust)
        this.appRoutes.get('/categories',this.getCats)
        this.appRoutes.post('/subcats',this.getSubcats)
        this.appRoutes.use(authMiddleware.validateAuthToken)
        this.appRoutes.post('/subcat/find',this.findOneSubCat)
        this.appRoutes.post('/address/add',this.addAddress)
        this.appRoutes.get('/address',this.getAddress)
        this.appRoutes.post('/address/one',this.getOneAddress)
        this.appRoutes.post('/address/edit',this.editOneAddress)
        this.appRoutes.post('/address/delete',this.deleteAddress)
        this.appRoutes.get('/profile',this.getprofile)
        this.appRoutes.post('/profile/add',this.updateProfile)
        this.appRoutes.post('/orders',this.getOrders)
        this.appRoutes.post('/order/create',this.createOrder)
        this.appRoutes.post('/order/process',this.processOrder)
        
    }
    login(req,res){
        userController.loginCust(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    getCats(req,res){
        categoryController.getCategories(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    getSubcats(req,res){
        subcategoriesController.getCatSubCats(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }

    addAddress(req,res){
        addressController.addCustAddress(req)
        .then(([data,message]) => {
              ResponseHandler.handleResponse(res,data,message)  
        }).catch(([status,error]) => {
            ResponseHandler.handleErrorResponse(res,status,error);
        });
    }

    getAddress(req,res){
        addressController.getCustAddress(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)
        });
    }

    getOneAddress(req,res){
        addressController.getCustOneAddress(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)
        });
    }

    editOneAddress(req,res){
        addressController.editOneAddress(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)
        });
    }

    deleteAddress(req,res){
        addressController.deleteAddress(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)
        });
    }

    getprofile(req,res){
        userController.getCustProfile(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    updateProfile(req,res){
        userController.updateCustProfile(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    getOrders(req,res){
        orderController.getCustOrders(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    registerCust(req,res){
        userController.createCustProfile(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    findOneSubCat(req,res){
        subcategoriesController.findOneSubCatPost(req)
        .then(([data,message]) => {
            ResponseHandler.handleResponse(res,data,message)
        }).catch(([status,error]) => {
            ResponseHandler.handleErrorResponse(res,status,error)
        });
    }
    createOrder(req,res){
        orderController.createOrder(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    processOrder(req,res){
        orderController.processOrder(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }









    
    deleteCategory(req,res){
        categoryController.deleteCategory(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    deleteSubCategory(req,res){
        subcategoriesController.deleteSubcategory(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    updateOrderStatus(req,res){
        orderController.updateOrder(req)
        .then(([data,message]) => {
              ResponseHandler.handleResponse(res,data,message)  
        }).catch(([status,error]) => {
            ResponseHandler.handleErrorResponse(res,status,error);
        });
    }
    
    findOneCat(req,res){
        categoryController.findOneCat(req)
        .then(([data,message]) => {
            ResponseHandler.handleResponse(res,data,message)
        }).catch(([status,error]) => {
            ResponseHandler.handleErrorResponse(res,status,error)
        });
    }
}

export default new AppRoutes().appRoutes