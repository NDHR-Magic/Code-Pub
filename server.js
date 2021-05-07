const express = require("express");
const path = require("path");
const sequelize = require("./connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const controllers = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: "Pubs and Peeps secret items",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess));

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(controllers);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
