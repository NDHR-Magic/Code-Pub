const router = require("express").Router();
const {Events} = require("../../../models");


router.get("/", async(req, res)=>{
    try{
        const eventInfo = await Events.findAll()


        const events = eventInfo.map(event => event.get({ plain: true}));

        res.status(200).json(events);
    } catch(e) {
        res.status(500).json(e);
    }
});

module.exports = router; 