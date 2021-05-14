const Item = require("./item");
const User = require("./user");
const Cart = require("./Cart");

User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

module.exports = { Item, User }