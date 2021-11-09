import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import db from './configs/db'
// import Admin from './models/admin.model'
// import User from './models/user.model'
// import Category from  './models/category.model'
// import SubCats from './models/sub_category.model'
// import Address from './models/address.model'
// import Order from './models/order.model'
// import Refund from './models/refund.model'
import indexRoutes from './routes/index.routes'
import path from 'path'
class App{
    a;
    constructor(){
        this.a=express()
        this.method1()
    }
    method1(){
        this.a.use(cors())
        this.a.use(helmet())
        this.a.use(morgan('dev'))
        this.a.use(bodyParser({limit:"5mb"}))
        this.a.use(bodyParser.urlencoded({extended:true}))
        this.a.use(bodyParser.json())
        this.a.disable('etag');
        this.a.use('/static',express.static('public'));
        this.method2()
    }
    method2(){
        this.a.use('/',indexRoutes)
        this.a.get('/ping',function(req,res,next){
            res.status(200).json({message:'ping is ponged'})
        })
        this.a.use(function(req,res,next){
            res.status(404).send("get the fuct out of here")
        })
    }
}

export default new App().a