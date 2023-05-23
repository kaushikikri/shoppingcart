import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export const Products = ({ product }) => {
    const { id, name, price, image } = product;
    const { addCart, cartList, deleteCart } = useCart();

    const [btn, setBtn] = useState(false);

    useEffect(() => {
        const isThere = cartList.find(item => item.id === id);
        if (isThere) {
            setBtn(true);
        }
        else {
            setBtn(false);
        }
    }, [cartList, id])

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <img className="px-2 py-5 rounded-t-lg h-80" src={image} alt="Boat" />

            <div className="px-2 pb-5">
                <h5 className="text-xl pb-5 font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">${price}</span>
                    {btn ? <button type="button" onClick={() => deleteCart(product)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2.5  mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
                        : <button onClick={() => addCart(product)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>}


                </div>
            </div>
        </div>
    )
}
