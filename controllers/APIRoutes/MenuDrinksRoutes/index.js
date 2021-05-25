const router = require("express").Router();
const multer = require("multer");
const { drinkItem } = require("../../../models");
const { isAuth, isAdmin } = require("../../../utils/utils");

router.get("/", async (req, res) => {
    try {
        const drinkData = await drinkItem.findAll();
        const drinks = drinkData.map(drink => drink.get({ plain: true }))

        res.status(200).json(drinks);
    } catch (e) {
        res.status(500).json(e);
        console.log(e)
    }
});

// Create drink item. Admin only and use multer for image upload
const drinkUpload = multer({ dest: `./client/public/Images/MenuItems` });
router.post("/", isAuth, isAdmin, drinkUpload.single("file"), async (req, res) => {
    try {
        const drinkData = await drinkItem.create({
            name: req.body.name,
            price: parseFloat(req.body.price).toFixed(2),
            image: `./Images/MenuItems/${req.file.filename}`,
            description: req.body.desc
        });

        res.status(201).json({ message: "Created drink menu item", drinkData });
    } catch (e) {
        res.status(500).json({ message: e });
        console.log(e);
    }
});

module.exports = router;