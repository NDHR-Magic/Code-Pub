const Item = require("./item");
const User = require("./user");
const Cart = require("./Cart");
const Purchases = require("./Purchases");
const PurchaseHistory = require("./PurchaseHistory");
const CartContents = require("./CartContents");

User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Purchases, { foreignKey: "user_id" });
Purchases.belongsTo(User, { foreignKey: "user_id" });

Purchases.belongsToMany(Item, { through: PurchaseHistory, foreignKey: "purchase_id" });
Item.belongsToMany(Purchases, { through: PurchaseHistory, foreignKey: "item_id" });

Cart.belongsToMany(Item, { through: CartContents, foreignKey: "cart_id" });
Item.belongsToMany(Cart, { through: CartContents, foreignKey: "item_id" });

module.exports = { Item, User, Purchases, Cart };