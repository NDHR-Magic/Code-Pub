const sequelize = require('../connection');
const { Model, Datatypes } = require('sequelize');

class favoriteDrinks extends Model {}

favoriteDrinks.init (
    {

    }
)

module.exports = favoriteDrinks;