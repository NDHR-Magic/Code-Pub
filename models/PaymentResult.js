const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PaymentResult extends Model { }

PaymentResult.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    payment_id: {
        type: DataTypes.STRING
    },
    status: { type: DataTypes.STRING },
    update_time: { type: DataTypes.STRING },
    email_address: { type: DataTypes.STRING },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "order",
            key: "id"
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "paymentResult"
});

module.exports = PaymentResult;