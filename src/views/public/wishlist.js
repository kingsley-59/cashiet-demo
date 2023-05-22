import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import '../../../assets/css/style.css'
import CartService from "../../../services/cartService";

const Wishlist = () => {
    const [ wishlists, setWishlists ] = useState([]);
    const [ Loading, setLoading ] = useState(false);
    let addToCart = CartService.addCart;

    const getWishlists = async () => {
        
        setLoading(true);
        
        try {
            const response = await httpService.get('/wishlist/user')

            if(response.status === 200){ 
                setWishlists(response.data.wishlist.products);
                setLoading(false);
            }
            
        }
        catch (e) {
            toast.error("Oopps, server error");
            setLoading(false);
        }
    }

    const removeFromWishlist = async (id) => {
        
        setLoading(true);
        
        try {
            const response = await httpService.delete('/wishlist/remove/'+id)
            
            if(response.status === 200){ 
                toast.success("Product successfully removed from wishlist")
                getWishlists();
            }
            
        }
        catch (e) {
            toast.error("Oopps, network error");
            setLoading(false);
        }
    }

    useEffect(() => {
        getWishlists();
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card dashboard-table mt-0">
                        <div className="card-body table-responsive-sm">
                        <div className="top-sec">
                            <h3>My Wishlist</h3>
                        </div>
                        <div className="table-responsive-xl">
                            <table className="table cart-table wishlist-table">
                                <thead>
                                    <tr className="table-head">
                                    <th scope="col">image</th>
                                    <th scope="col">Product Details</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { wishlists.length > 0  &&  wishlists.map((wishlist, key) => (
                                        <tr key={key}>
                                            <td>
                                                <a href="#">
                                                <img src={wishlist.product.image? wishlist.product.image.url : ''} className="blur-up lazyloaded" alt="" />
                                                </a>
                                            </td>
                                            <td>
                                                <span>{ wishlist.product.name }</span>
                                            </td>
                                            <td>
                                                <span className="theme-color fs-6">{ wishlist.product.price }</span>
                                            </td>
                                            <td>
                                                <a  onClick={ () => addToCart(wishlist.product) } href="#" className="btn btn-xs btn-solid">
                                                Move to Cart
                                                </a>
                                                <a onClick={(e) => removeFromWishlist(wishlist.product._id)} href="#" className="btn btn-xs btn-remove btn-solid m-2">
                                                    Remove
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            { wishlists.length < 1 && 
                                <div className=" no-items-wrap "  >
                                    <p className="no-items-p">No Products available</p>
                                    <a  href="/products" className="btn btn-xs btn-solid">
                                        Go to Shop
                                    </a>
                                </div>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist;