import db from '../configs/db';
import Sequelize from 'sequelize';


class Admin {
    admin;
    constructor(){
       this.admin = db.define('admin',{
           id:{
               type:Sequelize.BIGINT,
               primaryKey:true,
               autoIncrement:true
           },
           admin_name:{
               type:Sequelize.STRING,
               allowNull:false,
               defaultValue:""
           },
           admin_email:{
               type:Sequelize.STRING,
               allowNull:true,
               unique:true
           },
           admin_mobile:{
               type:Sequelize.STRING,
               allowNull:false,
                defaultValue:""
           },
           admin_password:{
               type:Sequelize.STRING,
               allowNull:false,
               defaultValue:""
           },
           admin_role_flg:{
               type:Sequelize.INTEGER,
               allowNull:false,
               defaultValue:0
           }
       },{
           timestamps:true
       }) 
    }
}

export default new Admin().admin;