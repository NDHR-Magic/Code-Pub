const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Events extends Model { }

Events.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },

    event_date: {
        type:DataTypes.DATE,
        allowNull: true
    }, 
}, {
    sequelize,
    timestamps:true,
    modelName:"Event",
    freezeTableName: true,
});

module.exports = Events;