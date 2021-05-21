const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class OrderItem extends Model { }

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "order",
            key: "id"
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "item",
            key: "id"
        }
    }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: "orderItem"
});

module.exports = OrderItem;