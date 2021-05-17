const router = require("express").Router();
const { User } = require("../../../models");
const generateToken = require("../../../utils/utils");

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

        res.json({
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

module.exports = router;