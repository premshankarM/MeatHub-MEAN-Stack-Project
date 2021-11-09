import db from '../configs/db';
import Sequalize, { Sequelize } from 'sequelize';
import userModel from './user.model'

class Order{
    order;
    constructor()
    {
        this.order=db.define('order',{
            id:{
                type:Sequalize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            order_unique_id:{
                type:Sequalize.UUID,
                allowNull:false,
                defaultValue:Sequalize.UUIDV4
            },
            payment_order_id:{
                type:Sequelize.STRING,
                allowNull:true
            },
            order_data:{
                type:Sequalize.TEXT,
                allowNull:false,
            },
            order_amount:{
                type:Sequalize.FLOAT,
                allowNull:false,
            },
            payment_id:{
                type:Sequalize.STRING,
                allowNull:true,
                unique:true
            },
            order_status:{
                type:Sequelize.STRING,
                allowNull:false
            },
            payment_status:{
                type:Sequelize.STRING,
                allowNull:false
            },
            delivery_address:{
                type:Sequelize.STRING,
                allowNull:false
            },
            email:{
                type:Sequelize.STRING,
                allowNull:false
            }
        },{timestamps:true})
        this.defineRelation()
    }
    defineRelation(){
        this.order.belongsTo(userModel,{foreignKey:'user_id'})
    }
}

export default new Order().order