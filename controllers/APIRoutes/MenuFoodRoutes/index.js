const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
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

router.delete("/:id", async (req, res) => {
    try {
        const foodData = await foodItem.findByPk(req.params.id);

        const deletedFood = await foodItem.destroy({
            where: {
                id: req.params.id
            }
        });

        const path = foodData.image.split("/")[3];
        fs.unlink(`./client/public/Images/MenuItems/${path}`, (err) => {
            if (err) throw err;
            console.log("Successfully deleted image");
        });

        res.status(200).json({ message: "Deleted food item", deletedFood });
    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
});

module.exports = router;
