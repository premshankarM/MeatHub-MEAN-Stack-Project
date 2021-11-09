import express from 'express'
import orderController from '../controllers/order.controller';
import ResponseHandler from '../globalhelpers/ResponseHandler';
import categoryController from '../controllers/category.controller';
import subcategoriesController from '../controllers/sub_category.controller'
import adminController from '../controllers/admin.controller';
import adminMiddleware from '../middleware/admin.middleware';
class AdminRoutes{
    adminRoutes;
    constructor(){
        this.adminRoutes=express.Router()
        this.configAdminRoutes()
    }
    configAdminRoutes(){
        this.adminRoutes.post('/login',this.login)
        this.adminRoutes.use(adminMiddleware.validateAuthToken);
        this.adminRoutes.get('/orders',this.getOrders)
        this.adminRoutes.get('/categories',this.getCategories)
        this.adminRoutes.post('/category/add',this.addCategory)
        this.adminRoutes.get('/subcategories',this.getSubCategories)
        this.adminRoutes.get('/categories/find',this.findOneCat);
        this.adminRoutes.get('/subcategories/find',this.findOneSubCat)
        this.adminRoutes.post('/categories/update',this.updateCategory)
        this.adminRoutes.post('/subcategories/add',this.addSubCategory)
        this.adminRoutes.post('/subcategories/update',this.updateSubCategory)
        this.adminRoutes.post('/categories/delete',this.deleteCategory)
        this.adminRoutes.post('/subcategories/delete',this.deleteSubCategory)
        this.adminRoutes.post('/order/complete',this.updateOrderStatus)
        this.adminRoutes.post('/order/refund',this.refundOrder)
    }

    getOrders(req,res){
        orderController.getOrders(req)
        .then(([data,message]) => {
              ResponseHandler.handleResponse(res,data,message)  
        }).catch(([status,error]) => {
            ResponseHandler.handleErrorResponse(res,status,error);
        });
    }
    refundOrder(req,res){
        orderController.refundOrder(req)
        .then(([data,message]) => {
              ResponseHandler.handleResponse(res,data,message)  
        }).catch(([status,error]) => {
            ResponseHandler.handleErrorResponse(res,status,error);
        });
    }
    getCategories(req,res){
        categoryController.getCategories(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)
        });
    }
    getSubCategories(req,res){
        subcategoriesController.getSubCategories(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    addCategory(req,res){
        categoryController.addCategory(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    addSubCategory(req,res){
        subcategoriesController.addSubcategory(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    updateCategory(req,res){
        categoryController.updateCategory(req)
        .then(([data,msg]) => {
            ResponseHandler.handleResponse(res,data,msg)
        }).catch(([status,err]) => {
            ResponseHandler.handleErrorResponse(res,status,err)             
        });
    }
    updateSubCategory(req,res){
        subcategoriesController.updateSubcategory(req)
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
    login(req,res){
        adminController.login(req)
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
    findOneSubCat(req,res){
        subcategoriesController.findOneSubCat(req)
        .then(([data,message]) => {
            ResponseHandler.handleResponse(res,data,message)
        }).catch(([status,error]) => {
            ResponseHandler.handleErrorResponse(res,status,error)
        });
    }
}

export default new AdminRoutes().adminRoutes