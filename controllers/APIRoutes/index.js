const router = require("express").Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes.js");
const eventRoutes = require("./EventRoutes");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/events",eventRoutes);

module.exports = router;