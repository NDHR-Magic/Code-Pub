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

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'AReallyCoolJWTSecretFayl', (err, decode) => {
            if (err) {
                res.status(401).json({ message: "Invalid Token" });
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "No Token" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: "No Token" });
    }
};

module.exports = { generateToken, isAuth, isAdmin };