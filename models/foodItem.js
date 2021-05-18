const sequelize = require("../config/connection");
const { Model, DataTypes } = require('sequelize');

class foodItem extends Model {

};

foodItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'foodItem',
    }
)

module.exports = foodItem;