import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

let val = JSON.parse(localStorage.getItem("cartList"));
if (!val) val = [];

let tot = JSON.parse(localStorage.getItem("total"));
if (!tot) tot = 0;

//this is the state that user will see when visit site for the 1st time
const initialState = {
    cartList: val,
    total: tot
}

//now create a context to have this initial state

// export const Context = createContext(initialState);  //you can use this directly and access it anywhere using useContext(Context)
const Context = createContext(initialState);

//this below function is used to have what are the pages we will be providing information to, here we provided App
export const CartContext = ({ children }) => {  //here children is App as we wraped APP within CartContext in index.js file

    const [state, dispatch] = useReducer(cartReducer, initialState);  //state will be this initialStae and dispatch is like setState function but will let us update multiple states value

    const addCart = (product) => {  //this function will be called when user click on add to cart button
        const updateCart = state.cartList.concat(product);
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                product: updateCart
            }
        })
        updateTotal(updateCart);
        localStorage.setItem("cartList", JSON.stringify(updateCart));
    }

    const deleteCart = (product) => {
        const updateCart = state.cartList.filter((list) => (list.id !== product.id));
        dispatch({
            type: "DELETE_FROM_CART",
            payload: {
                product: updateCart
            }
        })
        updateTotal(updateCart);
        localStorage.setItem("cartList", JSON.stringify(updateCart));
    }

    const updateTotal = (list) => {
        let total = 0;
        list.forEach(item => total += item.price);

        dispatch({
            type: "UPDATE_TOTAL_PRICE",
            payload: {
                total: total
            }
        })

        localStorage.setItem("total", JSON.stringify(total));
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        addCart,
        deleteCart
    }

    return (
        //now provide the context and wrap the page you want as child
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}


//this is returning the context value . it is usefull when we have multiple context
export const useCart = () => {
    const contextValue = useContext(Context);
    return contextValue;
}

