import express from 'express'
import adminRoutes from './admin.route'
import appRoutes  from './app.route'

class IndexRoutes{
    indexRoutes;
    constructor() {
        this.indexRoutes=express.Router()
        this.configIndexRoutes()
    }
    configIndexRoutes(){
        this.indexRoutes.use('/admin',adminRoutes)
        this.indexRoutes.use('/app',appRoutes)
    }
}

export default new IndexRoutes().indexRoutes