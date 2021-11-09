import db from "../configs/db"
import Sequelize from 'sequelize'

class Token{
    token;
    constructor(){
        this.token=db.define('token',{
            id:{
                type:Sequelize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            user_email:{
                type:Sequelize.STRING,
                allowNull:false,
                default:''
            },
            token:{
                type:Sequelize.STRING,
                allowNull:false,
                default:''
            }
        },{timestamps:true}
        )
    }
}

export default new Token().token