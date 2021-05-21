const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class ShippingAddress extends Model { }

ShippingAddress.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2]
        }
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "order",
            key: "id"
        }
    }
}, {
    sequelize,
    timestamps: false,
    modelName: "shippingAddress",
    underscored: false,
    freezeTableName: true
});

module.exports = ShippingAddress;