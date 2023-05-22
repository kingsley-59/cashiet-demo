import CurrencyFormat from "react-currency-format";
import "react-loading-skeleton/dist/skeleton.css";
import { cartActions } from "../../store/cartSlice";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
const ProductquickView = ({ modalproduct, quantity }) => {
    const dispatch = useDispatch();

    return (
        <div className="modal fade bd-example-modal-lg theme-modal" id="quick-view" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content quick-view-modal">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        {modalproduct && (
                            <div className="row">
                                <div className="col-lg-6 col-xs-12">
                                    <div className="quick-view-img">
                                        <img src={modalproduct.image ? modalproduct.image.url : ""} alt="" className="img-fluid blur-up lazyload" />
                                    </div>
                                </div>
                                <div className="col-lg-6 rtl-text">
                                    <div className="product-right">
                                        <h2> {modalproduct.name} </h2>
                                        <h3>
                                            <CurrencyFormat value={modalproduct.price} displayType={"text"} thousandSeparator={true} prefix={"₦"} />
                                        </h3>
                                        <ul className="color-variant">
                                            <li className="bg-light0" />
                                            <li className="bg-light1" />
                                            <li className="bg-light2" />
                                        </ul>
                                        <div className="border-product">
                                            <h6 className="product-title">product details</h6>
                                            <p>{modalproduct?.description ? parse(modalproduct?.description) : <p></p>}</p>
                                        </div>
                                      
                                        <div className="product-buttons">
                                        {!(modalproduct?.category?.name === "Automobile" || modalproduct?.category?.name === "Real Estate") && (
                                            <button  className="btn btn-solid" 
                                                onClick={() => dispatch(cartActions.addCart(modalproduct))}
                                                title="Add to cart"
                                            >
                                                add to cart
                                            </button>
                                        )}
                                            <a href={"/product/" + modalproduct._id} className="btn btn-solid">
                                                view detail
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductquickView;