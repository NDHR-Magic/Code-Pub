const router = require("express").Router();
const multer = require("multer");
const { foodItem } = require("../../../models");
const { isAuth, isAdmin } = require("../../../utils/utils");

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

// Create drink item. Admin only and use multer for image upload
const foodUpload = multer({ dest: `./client/public/Images/MenuItems` });
router.post("/", isAuth, isAdmin, foodUpload.single("file"), async (req, res) => {
    try {
        const foodData = await foodItem.create({
            name: req.body.name,
            price: parseFloat(req.body.price).toFixed(2),
            image: `./Images/MenuItems/${req.file.filename}`,
            description: req.body.desc
        });

        res.status(201).json({ message: "Created food menu item", foodData });
    } catch (e) {
        res.status(500).json({ message: e });
        console.log(e);
    }
});

module.exports = router;
