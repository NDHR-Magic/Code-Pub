const router = require("express").Router();
const { drinkItem } = require("../../../models");

router.get("/", async (req, res) => {
    try {
        const drinkData = await foodItem.findAll();
        const drinks = drinkData.map(drink => drink.get({ plain: true }))

        res.status(200).json(drinks);
    } catch (e) {
        res.status(500).json(e);
        console.log(e)
    }
});

module.exports = router;