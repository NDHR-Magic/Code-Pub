const router = require("express").Router();
const { Order, OrderItem, ShippingAddress, Item } = require("../../../models");
const { isAuth } = require("../../../utils/utils");


// Do later
router.get("/:id", async (req, res) => {
    try {
        const orderData = await Order.findByPk(req.params.id, {
            include: [{ model: OrderItem, include: { model: Item } }, { model: ShippingAddress }]
        });

        const order = orderData.get({ plain: true });

        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Create order
router.post('/', isAuth, async (req, res) => {
    try {
        if (req.body.orderItems.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
        } else {
            const order = await Order.create({
                payment_method: req.body.paymentMethod,
                items_price: req.body.itemsPrice,
                shipping_price: req.body.shippingPrice,
                tax_price: req.body.taxPrice,
                total_price: req.body.totalPrice,
                user_id: req.user.id
            });

            for (const item of req.body.orderItems) {
                const itemData = await Item.findOne({
                    where: { name: item.name }
                });

                const itemStuff = itemData.get({ plain: true });

                const orderItem = await OrderItem.create({
                    order_id: order.id,
                    item_id: itemStuff.id,
                    qty: item.qty
                });
            };

            const shippingAddress = await ShippingAddress.create(req.body.shippingAddress);

            await order.setShippingAddress(shippingAddress);

            res.status(201).json({ message: 'Order Created', order: order });
        };
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;