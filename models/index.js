const Item = require("./item");
const User = require("./user");
const Cart = require("./Cart");
const drinkItem = require("./drinkItem");
const favoriteDrinks = require("./favoriteDrinks");
const foodItem = require("./foodItem");
const Events = require("./Events");
const Order = require("./Orders");
const OrderItem = require("./OrderItem");
const ShippingAddress = require("./ShippingAddress");

User.hasMany(favoriteDrinks, {
    foreignKey: "user_id"
});

favoriteDrinks.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Item.hasMany(OrderItem, { foreignKey: "item_id" });
OrderItem.belongsTo(Item, { foreignKey: "item_id" });

Order.hasOne(ShippingAddress, { foreignKey: "order_id" });
ShippingAddress.belongsTo(Order, { foreignKey: "order_id" });

module.exports = { Item, User, Cart, drinkItem, favoriteDrinks, foodItem, Events, Order, OrderItem, ShippingAddress };