const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                cartItems: action.payload.cartItems
            }
            case "REMOVE_FROM_CART":
                return {
                    cartItems: action.payload.cartItems
                }
                default:
                    return state;
    }
}