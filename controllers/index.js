const router = require("express").Router();
const apiRoutes = require("./APIRoutes");

router.use("/api", apiRoutes);

module.exports = router;