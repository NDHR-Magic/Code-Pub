const express = require("express");
const path = require("path");
const sequelize = require("./config/connection");
const controllers = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

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

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, function () {
        console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
});
