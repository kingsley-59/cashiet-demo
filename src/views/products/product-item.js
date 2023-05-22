import toast from "react-hot-toast";
import httpService from "../../services/http-service";
import CurrencyFormat from "react-currency-format";
import "react-loading-skeleton/dist/skeleton.css";
import { cartActions } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProductItem = ({ product, setModalProduct }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const addToWhishlist = async (productId) => {
        try {
            const response = await httpService.post({ endpoint: "/wishlist", details: { productId: productId } });

            if (response.status == 201) {
                toast.success("Product successfullly added to Wishlist");
            } else {
                throw response;
            }
        } catch (e) {
            toast.error('Unable to add to wishlist now, please try again');
        }
    };
    return (
        <>
            {/* Modal */}
            <div class="modal fade" id="PlaceOrderModal" tabindex="-1" aria-labelledby="placeOrderModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        {/* <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div className="modal-body p-5 text-center">
                            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x fs-4 fw-bold border border-1 rounded-3 border-dark"></i>
                            </button>
                            <h3 className="mb-4">Do you want to continue shopping?</h3>
                            <div className="w-100 text-center d-flex justify-content-between align-items-center">
                                <button className="btn btn-success text-white rounded-3 px-3" data-bs-dismiss="modal" aria-label="Close">
                                    Keep shopping
                                </button>
                                <button className="btn btn-success text-white rounded-3 px-3" data-bs-dismiss="modal" aria-label="Close" onClick={() => { navigate('/check-out') }}>
                                    Check out
                                </button>
                            </div>
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* Modal end */}

            <div className="col-xl-3 col-6 col-grid-box">
                <div className="product-box">
                    <div className="img-wrapper">
                        <div className="back">
                            <a href={"/product/" + product._id}>
                                <img src={product.image.url} className="img-fluid blur-up lazyload" alt="" />
                            </a>
                        </div>
                        <div className="front">
                            <a href={"/product/" + product._id}>
                                <img src={product.image.url} className="img-fluid blur-up lazyload" alt="" />
                            </a>
                        </div>


                        <div className="cart-info cart-wrap cart-dropshadow">
                            {!(product.category.name === "Automobile" || product.category.name === "Real Estate") && (
                                <button onClick={() => dispatch(cartActions.addCart(product))} title="Add to cart" data-bs-toggle="modal" data-bs-target="#PlaceOrderModal">
                                    <i className="ti-shopping-cart" />
                                </button>
                            )}

                            <span title="Add to Wishlist" onClick={(e) => addToWhishlist(product._id)}>
                                <i className="ti-heart" aria-hidden="true" />
                            </span>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view" title="Quick View" onClick={() => setModalProduct(product)}>
                                <i className="ti-search" aria-hidden="true" />
                            </a>

                        </div>
                    </div>

                    <div className="product-detail">
                        <div className="rating">
                            <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" />
                            <i className="fa fa-star" /> <i className="fa fa-star" />
                        </div>

                        <a href={"/product/" + product._id}>
                            <h6>{product.name}</h6>
                        </a>

                        <p>
                            {/* { product.description } */}
                            {/* {parse(product.description)} */}
                        </p>
                        <h4>
                            <CurrencyFormat value={product.price} displayType={"text"} thousandSeparator={true} prefix={"₦"} />
                        </h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductItem;