//this is our resucer that will accept state and sction   state is the current context value and action is what we have to define
export const cartReducer = (state, action) => {
    const { type, payload } = action;   //type is what we have to perfoem and payload have updated information

    //define all the actions as a switch statement and return whatever you want to retuen after the action
    switch (type) {
        case "ADD_TO_CART":
            return { ...state, cartList: payload.product }

        case "DELETE_FROM_CART":
            return { ...state, cartList: payload.product }

        case "UPDATE_TOTAL_PRICE":
            return { ...state, total: payload.total }

        default:
            break;
    }
}

