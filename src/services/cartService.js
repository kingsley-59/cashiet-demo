
// const CartService = {};

import toast from "react-hot-toast";

// CartService.addCart = (product)=>{
//     var storageItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
//     var itemExist = false;
//     var storageItems =  storageItems.map((item) => {

//         if(item._id == product._id){
//             item.qty += 1;
//             itemExist = true;
//         }
//         else{
//             storageItems.push(product);
//         }
//         return item;
//     });

//     if(!itemExist){
//         storageItems.push({...product, qty: 1})
//     }

//     console.log(storageItems);
    
//     localStorage.setItem('cart', JSON.stringify(storageItems));
// }

// export default CartService;


export default {
    addCart: (product, quantity = 1)=>{
        var storageItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
        var itemExist = false;
        storageItems =  storageItems.map((item) => {
            if(item._id === product._id){
                if( quantity === 1){
                    item.qty ++;
                }
                else{
                    item.qty = quantity
                }
                
                itemExist = true;
            }
            else{
                storageItems.push(product);
            }
            return item;
        });
    
        if(!itemExist){
            storageItems.push({...product, qty: 1})
        }
    
        
        localStorage.setItem('cart', JSON.stringify(storageItems));
        toast.success('Item added to cart successfuly')
    },

    removeFromCart: (product) => {


        var storageItems = JSON.parse(localStorage.getItem('cart') || '[]');

        storageItems =  storageItems.filter((item) => item._id !== product._id );

        localStorage.setItem('cart', JSON.stringify(storageItems));

        window.location.reload()
    },

    // getCart: () => {
        // let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // let subTotal = 0;

        // cart = cart.map((item) =>{
        //     item.total = item.qty * item.price;
        //     subTotal +=item.total;
        //     return item;
        // })
    // }
}