const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = user => {
    return jwt.sign({
        id: user.id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET || 'somethingsecret', {
        expiresIn: "30d",
    });
}

module.exports = generateToken;