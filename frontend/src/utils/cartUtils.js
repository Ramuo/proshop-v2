// HELPER FUNCTION TO ADD DECIMAL
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100 ).toFixed(2);
};



export const updateCart = (state) => {
    // To Calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => 
    acc + item.price * item.qty, 0));

    // To Calculate shipping price (If order is over $100 then free, else $10 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // To Calculate tax price (15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    // To Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice)
    ).toFixed(2);

    // To Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));


    return state;
};