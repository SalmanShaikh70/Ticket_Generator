let {sequelizeCon,Model,DataTypes} = require("../init/DbConfig")
class Ticket extends Model{}
Ticket.init({
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    product_model : {
        type : DataTypes.STRING,
        allowNull : false
    },
    issue_type : {
        type : DataTypes.STRING,
        allowNull : false
    },
    issue_description : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    tableName : "ticket",
    modelName : "Ticket",
    sequelize : sequelizeCon
})

module.exports = {Ticket}