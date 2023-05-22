import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
var items = localStorage.getItem('cart');

if (items) {
    items = JSON.parse(items)
} else {
    items = { storageItems: [], totalQuantity: 0 }
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: { storageItems: [], totalQuantity: 0 },
    reducers: {
        replaceCart(state) {
            state.storageItems = items.storageItems ?? [];
            state.totalQuantity = items.totalQuantity ?? 0;
        },
        updateQuantity() {

        },
        addCart(state, action, quantity = 1) {
            const product = action.payload;
            const productQuantity = action.payload.productQuantity;
            if (productQuantity >= 1) {
                if (state.totalQuantity < 1) {
                    state.totalQuantity = 0
                }
                state.storageItems = state.storageItems.map((item) => {
                    if (item._id === product.product._id) {
                        item.qty = productQuantity;
                        item.total = productQuantity * item.price
                        state.totalQuantity = parseInt(state.totalQuantity) - parseInt(product.product.qty) + parseInt(productQuantity);

                    }

                    return item;
                });
                localStorage.setItem('cart', JSON.stringify(state));
                toast.success('Item updated successfuly')
            } else if (productQuantity < 1) {
                state.totalQuantity--
                if (state.totalQuantity < 1) {
                    state.totalQuantity = 0
                }
                const product = action.payload;

                state.storageItems = state.storageItems.filter((item) => item._id !== product.product._id);

                localStorage.setItem('cart', JSON.stringify(state));
                toast.success('Item updated successfuly')
                // window.location.reload()
            }
            else {
                var itemExist = false;
                state.totalQuantity++
                if (state.totalQuantity < 1) {
                    state.totalQuantity = 0
                }
                state.storageItems = state.storageItems.map((item) => {
                    if (item._id === product._id) {
                        if (quantity === 1) {
                            item.qty++;
                            item.total = item.qty * item.price
                        }
                        else {
                            item.qty = quantity
                            item.total = item.qty * item.price
                        }

                        itemExist = true;
                    }
                    else {
                        state.storageItems.push(product);
                    }
                    return item;
                });
                if (!itemExist) {
                    state.storageItems.push({ ...product, qty: 1, total: product.price })
                }

                localStorage.setItem('cart', JSON.stringify(state));
                toast.success('Item added to cart successfuly')
            }





        },

        removeFromCart: (state, action) => {
            if (state.totalQuantity > 0) {
                state.totalQuantity = state.totalQuantity - action.payload.qty

            }
            if (state.totalQuantity < 1) {
                state.totalQuantity = 0
            }
            const product = action.payload;

            state.storageItems = state.storageItems.filter((item) => item._id !== product._id);

            localStorage.setItem('cart', JSON.stringify(state));
            toast.success('Item removed from cart successfuly')

        },
    }

});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer