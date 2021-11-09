import db from '../configs/db';
import Sequelize from 'sequelize';

class User{
    user;
    constructor()
    {
        this.user=db.define('user',{
            id:{
                type:Sequelize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            user_name:{
                type:Sequelize.STRING,
                allowNull:false,
                defaultValue:''
            },
            user_mobile:{
                type:Sequelize.STRING,
                allowNull:false,
                defaultValue:'',
                unique:true
            },
            user_email:{
                type:Sequelize.STRING,
                allowNull:true,
                unique:true
            },
            password:{
                type:Sequelize.STRING,
                allowNull:false,
                default:''
            }
        },{timestamps:true})
    }
}

export default new User().user