const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class PurchaseHistory extends Model { }

PurchaseHistory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    purchase_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "purchases",
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
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "purchaseHistory"
});

module.exports = PurchaseHistory;