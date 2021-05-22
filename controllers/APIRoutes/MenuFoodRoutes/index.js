const router = require("express").Router();
const { foodItem } = require("../../../models");

router.get("/", async (req, res) => {
    try {
        const foodData = await foodItem.findAll();
        const foodItems = foodData.map(food => food.get({ plain: true }))

        res.status(200).json(foodItems);
    } catch (e) {
        res.status(500).json(e);
        console.log(e)
    }
});

module.exports = router;
