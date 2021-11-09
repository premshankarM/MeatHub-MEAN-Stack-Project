import db from '../configs/db';
import Sequalize from 'sequelize';

class Refund{
    refund;
    constructor()
    {
        this.refund=db.define('refund',{
            id:{
                type:Sequalize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            refund_unique_id:{
                type:Sequalize.UUID,
                allowNull:false,
                defaultValue:Sequalize.UUIDV4
            },
            refund_data:{
                type:Sequalize.JSON,
                allowNull:false,
                defaultValue:{}
            },
            refund_amount:{
                type:Sequalize.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            refund_payment_id:{
                type:Sequalize.STRING,
                allowNull:false,
                unique:''
            }
        },{timestamps:true})
    }
}

export default new Refund().refund