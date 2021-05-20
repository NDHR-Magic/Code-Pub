const sequelize = require("../config/connection");
const { Item, User, drinkItem, foodItem, Events } = require("../models");
const itemData = require("./seed-storeItems.json");
const userData = require("./user-seeds.json");
const drinkData = require("./drink-seeds.json");
const foodData = require("./food-seeds.json");
const eventData = require("./eventSeeds.json");

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });

        await drinkItem.bulkCreate(drinkData);
        console.log("Seeded drinks \n");

        await foodItem.bulkCreate(foodData);
        console.log("Seeded food items \n");

        await Item.bulkCreate(itemData);
        console.log("Seeded items \n");

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
        });
        console.log("Seeded users\n");

        await Events.bulkCreate(eventData);
        console.log("Seeded events\n");

        process.exit(0);
    } catch (e) {
        console.log(e);
    }
}

seedAll();