import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import "../../../assets/css/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
const Wishlist = () => {
    const [wishlists, setWishlists] = useState([]);
    const [Loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const getWishlists = async () => {
        setLoading(true);

        try {
            const response = await httpService.get("/wishlist/user");
            if (response.status === 200) {
                setWishlists(response.data.wishlist.products ? response.data.wishlist.products : []);
                setLoading(false);
            }
        } catch (e) {
            // toast.error("Oopps, server error");
            setLoading(false);
        }
    };
    const removeFromWishlist = async (id) => {
        setLoading(true);

        try {
            const response = await httpService.delete("/wishlist/remove/" + id);

            if (response.status === 200) {
                toast.success("Product successfully removed from wishlist");
                getWishlists();
            }
        } catch (e) {
            toast.error("Oopps, Network unavailable!");
            setLoading(false);
        }
    };

    useEffect(() => {
        getWishlists();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card dashboard-table mt-0">
                        <div className="card-body table-responsive-sm">
                            <div className="top-sec"></div>
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
                                    {wishlists && (
                                        <tbody>
                                            {wishlists.length > 0 &&
                                                wishlists.map((wishlist, key) => (
                                                    <tr key={key}>
                                                        <td>
                                                            <div className="wish-img">
                                                                <img src={wishlist?.image ? wishlist?.image.url : ""} className="blur-up lazyloaded wish-img " alt="" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span>{wishlist?.name}</span>
                                                        </td>
                                                        <td>
                                                            <span className="theme-color fs-6">{wishlist?.price}</span>
                                                        </td>
                                                        <td>
                                                            <i onClick={() => dispatch(cartActions.addCart(wishlist))} href="#" className="fa fa-shopping-cart addon"></i>

                                                            <i onClick={(e) => removeFromWishlist(wishlist._id)} href="#" className="fa fa-trash text-danger addon"></i>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    )}
                                </table>
                                {wishlists && (
                                    <div>
                                        {wishlists.length < 1 && (
                                            <div className=" no-items-wrap ">
                                                <p className="no-items-p">No Products available</p>
                                                <a href="/products" className="btn btn-xs btn-solid">
                                                    Go to Shop
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
