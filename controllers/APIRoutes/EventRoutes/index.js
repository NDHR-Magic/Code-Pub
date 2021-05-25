const router = require("express").Router();
const {Events} = require("../../../models");
const {isAuth} = require("../../../utils/utils");


router.get("/", async(req, res)=>{
    try{
        const eventInfo = await Events.findAll()


        const events = eventInfo.map(event => event.get({ plain: true}));

        res.status(200).json(events);
    } catch(e) {
        res.status(500).json(e);
    }
});

router.get("/:id" ,async(req, res)=>{
    try{
        const eventData = await Events.findByPk(req.params.id)

        if(!eventData){
            res.status(404).json({message:"cant find this event!"});
            return
        }

        const event = eventData.get({ plain: true});
        res.status(200).json(event);
        
    } catch(e) {
        res.status(500).json(e);
        console.log(e);
    }
});

module.exports = router; 