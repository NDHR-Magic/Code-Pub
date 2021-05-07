const router = require("express").Router();

router.use("/", async (req, res) => {
    try {

        res.status(200).json("test");
    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
})

module.exports = router;