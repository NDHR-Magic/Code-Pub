const router = require("express").Router();
const { Order, OrderItem, ShippingAddress, Item, User, PaymentResult } = require("../../../models");
const { isAuth } = require("../../../utils/utils");


// Do later
router.get("/", async (req, res) => {
    try {
        const orderData = await Order.findAll(req.params.id, {
            include: [{ model: OrderItem, include: { model: Item } }, { model: ShippingAddress }, { model: User }, { model: PaymentResult }]
        });

        const orders = orderData.map(order => order.get({ plain: true }));

        res.status(200).json(orders);
    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const orderData = await Order.findByPk(req.params.id, {
            include: [{ model: OrderItem, include: { model: Item } }, { model: ShippingAddress }, { model: User }, { model: PaymentResult }]
        });

        if (!orderData) {
            res.status(404).json({ message: "Order not found" });
            return;
        }

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

            const shippingAddress = await ShippingAddress.create({
                full_name: req.body.shippingAddress.fullName,
                address: req.body.shippingAddress.address,
                city: req.body.shippingAddress.city,
                state: req.body.shippingAddress.state,
                zip_code: req.body.shippingAddress.zipCode,
                country: req.body.shippingAddress.country
            });

            await order.setShippingAddress(shippingAddress);

            res.status(201).json({ message: 'Order Created', order: order });
        };
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.put("/:id/pay", isAuth, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        order.is_paid = true;
        order.paid_at = Date.now();
        order.paymentResult = { id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address }

        const paymentResultData = await PaymentResult.create({
            payment_id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
            order_id: order.id
        });

        const updatedOrder = await order.save();

        res.status(200).json({ message: "Order Paid", order: updatedOrder });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;