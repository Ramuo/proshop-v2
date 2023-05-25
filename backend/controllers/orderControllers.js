import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';


//@desc     Create a new order
//@route    POST /api/orders
//@Access   Private
const addOrderItems = asyncHandler(async (req, res) => {
    //Let's get items from the body through the frontend
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    //Let's check if the orderItems is empty or not then create it (orderItems is an array)
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error(" Pas d'article commandé");
    }else{
        const order = new  Order({
            orderItems: orderItems.map((x) => ({
                ...x, 
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        //Save the created order
        const createdOrder = await order.save();

        res.status(200).json(createdOrder);

    };

});  

//@desc     Get logged in user orders
//@route    GET /api/orders/mine
//@Access   Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
}); 

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
  
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
}); 

//@desc     update order to paid
//@route    PUT /api/orders/:id/pay
//@Access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    }else{
        res.status(404);
        throw new Error('Commande non trouvé')
    }
});

//@desc     update order to delivred
//@route    PUT /api/orders/:id/delivred
//@Access   Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered')
});

//@desc     Get all orders
//@route    Get /api/orders
//@Access   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders')
});


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};