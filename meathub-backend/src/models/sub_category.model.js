import db from '../configs/db';
import Sequelize  from 'sequelize'
import Category from './category.model' 
class SubCat{
    sub_cat;
    constructor(){
        this.sub_cat=db.define('subcategory',{
            id:{
                type:Sequelize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            sub_cat_name:{
                type:Sequelize.STRING,
                allowNull:false,
                defaultValue:''
            },
            sub_cat_image:{
                type:Sequelize.STRING,
                allowNull:true
            },
            sub_cat_desc:{
                type:Sequelize.STRING,
                allowNull:true
            },
            rate_per_kg:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            }
        },{timestamps:true})
        this.defineRelations();
    }

    defineRelations(){
        this.sub_cat.belongsTo(Category,{foreignKey:'category_id'})
    }
}

export default new SubCat().sub_cat