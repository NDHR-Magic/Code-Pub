const Item = require("./item");
const User = require("./user");
const Cart = require("./Cart");
const drinkItem = require("./drinkItem");
const favoriteDrinks = require("./favoriteDrinks");
const foodItem = require("./foodItem");
const Events = require("./Events");

User.hasMany(favoriteDrinks, {
    foreignKey: "user_id"
});

favoriteDrinks.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { Item, User, Cart, drinkItem, favoriteDrinks, foodItem, Events };