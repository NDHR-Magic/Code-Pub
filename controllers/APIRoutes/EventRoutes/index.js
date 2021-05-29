const router = require("express").Router();
const { Events, User } = require("../../../models");
const { isAuth } = require("../../../utils/utils");
const { beforeFindAfterExpandIncludeAll } = require("../../../models/item");
const models = require("../../../models");


router.get("/", async (req, res) => {
    try {
        const eventInfo = await Events.findAll()


        const events = eventInfo.map(event => event.get({ plain: true }));

        res.status(200).json(events);
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const eventData = await Events.findByPk(req.params.id);

        const numAttendees = await eventData.countAttendee();
        const attendeesData = await eventData.getAttendee();

        const attendees = attendeesData.map(attendee => attendee.get({ plain: true}));

        if (!eventData) {
            res.status(404).json({ message: "cant find this event!" });
            return
        }

        const event = eventData.get({ plain: true });
        res.status(200).json({event, numAttendees, attendees});

    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
});

router.post("/addUser/:id", isAuth, async (req, res) => {
    try {

        const eventData = await Events.findByPk(req.params.id);
        const user = await User.findByPk(req.user.id);
        const alreadyAttending = await eventData.hasAttendee(user);
        if (alreadyAttending) {
            req.status(304).json({ message: "User already registeres" });
            return;
        }
        await eventData.addAttendee(user);
        await user.addEvent(eventData);

        res.status(200).json({ message: " Successfully registered user for an Event" });
    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
});


module.exports = router; 