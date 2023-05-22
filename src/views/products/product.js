import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import httpService from "../../services/http-service";
import "react-loading-skeleton/dist/skeleton.css";
import BuyNow from "../../dashboard/components/payments/buyNow";
import SingleProduct from "./product-single-item";
import SingleProductSkeleton from "./products-single-skeleton";
const Product = () => {
    const [product, setProduct] = useState();
    const [Loading, setLoading] = useState(false);
    const [gallery, setGallery] = useState();
    const [quantity, setQuantity] = useState(0);
    let id = useParams().productId

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await httpService.get('/products/' + id)
            setProduct(response.data.product)
            setGallery(response.data.product.gallery.images)
            setLoading(false);
        }
        catch (e) {
        setLoading(false);
            toast.error(e.response.data.message);
        }
    }
    const ProductsGallery = gallery ? gallery?.map((image) => image.url) : [];
    const AddKeyToArr = (item, index) => {
        var fullname = { image: item };
        return fullname;
    }
    var output = ProductsGallery.map(AddKeyToArr);
    const CarouselData = [{ image: product ? product.image.url : '' }, ...output,]
    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            {/* section start */}
            <section className="section-b-space">
                <div className="collection-wrapper">
                    <div className="container-xl">
                        <div className="row mx-0">
                            {!Loading &&
                                <div className="">
                                    {product &&
                                        <div >
                                            <div className="container-fluid p-0">
                                                <SingleProduct CarouselData={CarouselData} product={product} />
                                            </div>
                                        </div>
                                    }
                                </div>
                            }

                            {Loading &&
                                <SingleProductSkeleton />
                            }
                        </div>
                    </div>
                </div>

                {product && <>
                    <div className="modal fade bd-example-modal-lg theme-modal " id="buyNowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ width: '500px' }}>
                            <div className="modal-content quick-view-modal ">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="card-body" style={{ padding: '30px' }} >
                                    <div className="top-sec">
                                        <h3>Buy Now</h3>
                                        <p>This option allows you to pay for this product instantly</p>
                                    </div>
                                    <div className="address-book-section">
                                        <div className="checkout-page">
                                            {/* <BuyNow product = {product}/> */}
                                            <a href={`/check-out/?p_i=${product._id}/?n_p=${product.slug}`}>checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bd-example-modal-lg theme-modal " id="payLaterModal" tabIndex={-1} role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ width: '500px' }}>
                            <div className="modal-content quick-view-modal ">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="card-body" style={{ padding: '30px' }} >
                                    <div className="top-sec">
                                        <h3>Pay Later</h3>
                                        <p>This option allows you to pay later and installmentally. But make sure you have completed the financial verification in your dashboard</p>
                                        <Link to='/dashboard'>Verify Now?</Link>
                                    </div>
                                    <div className="address-book-section">
                                        <div className="checkout-page">
                                            <BuyNow product={product} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade bd-example-modal-lg theme-modal " id="saveLaterModal" tabIndex={-1} role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ width: '500px' }}>
                            <div className="modal-content quick-view-modal ">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="card-body" style={{ padding: '30px' }} >
                                    <div className="top-sec">
                                        <h3>Save and buy later</h3>
                                        <p>This option allows you to pay for this product instantly</p>
                                    </div>
                                    <div className="address-book-section">
                                        <div className="checkout-page">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            </section>

            {/* Section ends */}
        </>
    );
};

export default Product;
