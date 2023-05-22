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
        taxPice,
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
            taxPice,
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
    const orders = await Order.find({user: req.params._id});

    res.status(200).json(orders);
});  

//@desc     Get order by ID
//@route    GET /api/orders/:id
//@Access   Private
const getOrderById = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user',
   'name email' );

   if(order){
    res.status(200).json(order);
   }else{
    res.status(404);
    throw new Error("Commande non trouvée");
   }
});  

//@desc     update order to paid
//@route    PUT /api/orders/:id/pay
//@Access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid')
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