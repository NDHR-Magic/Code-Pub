const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class EventAttenders extends Model{};

EventAttenders.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    user_id:{
        type: DataTypes.INTEGER,
        references: {
            model:"User",
            key::"id"
        
        }
    },
    event_id: {
        type:DataTypes.INTEGER,
        references:{
            model:"event",
            key:"id",
        }
    }
},  {

    sequelize,
    timestamps: true,
    modelName: "evenAttender",
    underscored: true,
    freeTableName: true

});

module.exports = EventAttenders;
