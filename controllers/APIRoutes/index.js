const router = require("express").Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes.js");
const eventRoutes = require("./EventRoutes");
const orderRoutes = require("./orderRoutes");
const menuFoodRoutes = require("./MenuFoodRoutes");
const menuDrinkRoutes = require("./MenuDrinksRoutes");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/events", eventRoutes);
router.use("/orders", orderRoutes);
router.use("/drinks", menuDrinkRoutes);
router.use("/food", menuFoodRoutes);

module.exports = router;