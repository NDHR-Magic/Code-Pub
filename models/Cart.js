const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Cart extends Model { }

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "user",
            key: "id"
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    modelName: "cart"
});

module.exports = Cart;