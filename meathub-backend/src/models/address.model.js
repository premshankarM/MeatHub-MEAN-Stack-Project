import db from '../configs/db'
import Sequelize from 'sequelize'
import userModel from './user.model'

class Address{
    address;
    constructor(){
        this.address=db.define('address',{
            id:{
                type:Sequelize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            address_name:{
                type:Sequelize.STRING,
                allowNull:false,
                defaultValue:''
            },
            house_no:{
                type:Sequelize.STRING,
                allowNull:true
            },
            area_locality:{
                type:Sequelize.STRING,
                allowNull:false,
                defaultValue:''
            },
            landmark:{
                type:Sequelize.STRING,
                allowNull:false,
                defaultValue:''
            }
        },{timestamps:true})
        this.defineRelation()
    }
    defineRelation(){
        this.address.belongsTo(userModel,{foreignKey:'user_id'})
    }
}

export default new Address().address