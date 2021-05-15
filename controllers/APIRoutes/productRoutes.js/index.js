const router = require("express").Router();
const { Item } = require("../../../models");

router.get("/", async (req, res) => {
    try {
        const productData = await Item.findAll();

        const products = productData.map(product => product.get({ plain: true }));

        res.status(200).json(products);
    } catch (e) {
        res.status(500).json(e);
        console.log(e)
    }
})

module.exports = router;