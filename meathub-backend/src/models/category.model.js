import db from '../configs/db';
import Sequelize from 'sequelize';

class Category{
    category;
    constructor() {
        this.category=db.define('category',{
            id:{
                type:Sequelize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            cat_name:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            cat_image:{
                type:Sequelize.STRING,
                allowNull:true
            },
            cat_desc:{
                type:Sequelize.STRING,
                allowNull:false,
            }
        },{timestamps:true})
    }
}

export default new Category().category