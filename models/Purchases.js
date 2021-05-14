const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Purchases extends Model { }

Purchases.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: "purchases"
});

module.exports = Purchases;