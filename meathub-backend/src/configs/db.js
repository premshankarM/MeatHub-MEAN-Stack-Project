import Sequelize from 'sequelize'
import Config from './config'
class DB{
    conn;
    constructor(){
        this.conn=new Sequelize(Config.db.db,Config.db.username,Config.db.password,{
            host:Config.db.host,
            dialect:Config.db.dialect
        })
        this.conn.sync()
        .then(() => {
            console.log("hurry CONNECTED")
        }).catch((err) => {
            console.log("error",err)
        });
    }
}

export default new DB().conn