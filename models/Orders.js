const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Order extends Model { }

Order.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    items_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    shipping_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    tax_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: "order"
});

module.exports = Order;