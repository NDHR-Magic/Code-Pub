const Item = require("./item");
const User = require("./user");
const Cart = require("./Cart");
const drinkItem = require("./drinkItem");
const FavoriteDrinks = require("./favoriteDrinks");
const foodItem = require("./foodItem");
const Events = require("./Events");
const Order = require("./Orders");
const OrderItem = require("./OrderItem");
const ShippingAddress = require("./ShippingAddress");
const PaymentResult = require("./PaymentResult");
const EventAttenders = require("./EventAttenders");

User.hasMany(FavoriteDrinks, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

FavoriteDrinks.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Item.hasMany(OrderItem, { foreignKey: "item_id" });
OrderItem.belongsTo(Item, { foreignKey: "item_id" });

Order.hasOne(ShippingAddress, { foreignKey: "order_id" });
ShippingAddress.belongsTo(Order, { foreignKey: "order_id" });

Order.hasOne(PaymentResult, { foreignKey: "order_id", onDelete: "CASCADE" });
PaymentResult.belongsTo(Order, { foreignKey: "order_id" });

User.belongsToMany(Events, { through: EventAttenders, as: "Event", foreignKey: "user_id", onDelete: "CASCADE"});
Events.belongsToMany(User, { through: EventAttenders, as: "Attendee", foreignKey: "event_id", onDelete: "CASCADE"});


module.exports = { Item, User, Cart, drinkItem, FavoriteDrinks, foodItem, Events, Order, OrderItem, ShippingAddress, PaymentResult };