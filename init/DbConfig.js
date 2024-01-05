let {Sequelize,Model,DataTypes} = require("sequelize")
let config = require("config")
let mySqlConfig = config.get("mysql")
let sequelizeCon = new Sequelize(mySqlConfig)
sequelizeCon.authenticate().then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log("Database Not Connected",err);
})
// sequelizeCon.sync({alter:true})
module.exports = {
    sequelizeCon,
    Model,
    DataTypes
}