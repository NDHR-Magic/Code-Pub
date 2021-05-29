const router = require("express").Router();
const { User, FavoriteDrinks, Order, OrderItem, ShippingAddress, PaymentResult, Item } = require("../../../models");
const { generateToken } = require("../../../utils/utils");

// Login route
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        res.status(200).json({
            id: userData.id,
            name: userData.username,
            email: userData.email,
            isAdmin: userData.isAdmin,
            token: generateToken(userData)
        });

    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
});

// Register router
router.post('/register', async (req, res) => {
    try {
        const userData = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.status(201).json({
            id: userData.id,
            name: userData.username,
            email: userData.email,
            isAdmin: userData.isAdmin,
            token: generateToken(userData)
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: FavoriteDrinks }, { model: Order, include: [{ model: OrderItem, include: { model: Item } }, { model: ShippingAddress }, { model: PaymentResult }] }]
        });

        if (!userData) {
            res.status(404).json({ message: "Cannot find user" });
            return;
        }

        const events = await userData.getEvent();
        const user = userData.get({ plain: true });

        res.status(200).json({user, events});
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;