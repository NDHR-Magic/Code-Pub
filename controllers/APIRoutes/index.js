const router = require("express").Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes.js");
const eventRoutes = require("./EventRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/events", eventRoutes);
router.use("/orders", orderRoutes);

module.exports = router;