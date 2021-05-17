const sequelize = require("../config/connection");
const { Item, User } = require("../models");
const itemData = require("./seed-storeItems.json");
const userData = require("./user-seeds.json");

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });

        await Item.bulkCreate(itemData);
        console.log("Seeded items \n");

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
        });
        console.log("Seeded users\n");

        process.exit(0);
    } catch (e) {
        console.log(e);
    }
}

seedAll();