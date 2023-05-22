import CurrencyFormat from 'react-currency-format';
import parse from 'html-react-parser';
import { cartActions } from "../../store/cartSlice";
import { Carousel } from 'react-carousel-minimal';
import toast from "react-hot-toast";
import httpService from "../../services/http-service";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const SingleProduct = ({ product, CarouselData }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    const addToWhishlist = async (productId) => {
        try {
            const response = await httpService.post({ endpoint: '/wishlist', details: { productId: productId } })

            if (response.status == 201) {
                toast.success("Product successfullly added to Wishlist")
            }
            else {
                throw response

            }
        }
        catch (e) {
            toast.error(e.response.data.message);
        }
    }
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
                            <button  type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x fs-4 fw-bold border border-1 rounded-3 border-dark"></i>
                            </button>
                            <h3 className="mb-4">Do you want to continue shopping?</h3>
                            <div className="w-100 text-center d-flex justify-content-between align-items-center">
                                <button className="btn btn-success text-white rounded-3 px-3" data-bs-dismiss="modal" aria-label="Close">
                                    Keep shopping
                                </button>
                                <button className="btn btn-success text-white rounded-3 px-3" data-bs-dismiss="modal" aria-label="Close" onClick={() => {navigate('/check-out')}}>
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

            <div className="row card-body" style={{ minHight: '1000px!important' }}>
                <div className="col-lg-6 col-md-7   min-h-60-not-sm m-bottom-carousel" >
                    <Carousel
                        data={CarouselData}
                        time={2000}
                        width="850px"
                        height="500px"
                        radius="10px"
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        dots={true}
                        automatic={false}
                        pauseIconColor="red"
                        pauseIconSize="40px"
                        slideImageFit="fit"
                        slideBackgroundColor="#d3d3d35e"
                        thumbnails={true}
                        thumbnailWidth="100px"
                        style={{
                            textAlign: "center",
                            maxWidth: "850px",
                            maxHeight: "500px",
                        }}
                    />
                </div>
                <div className="col-lg-6  col-md-5 min-h-601 sm-no-margin-top">
                    <h2 style={{ fontSize: '17px' }}>{product.name}</h2>
                    <h3 className="price-detail">

                        <CurrencyFormat className="product-price" value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                        <del>
                            {/* <CurrencyFormat value='459.00' displayType={'text'} thousandSeparator={true} prefix={'₦'} /> */}
                        </del>
                    </h3>

                    <div id="selectSize" className="addeffect-section product-description border-product">
                        {!(product.category.name === 'Automobile' || product.category.name === 'Real Estate') &&
                            <div className="w-70">
                                {/* <h6 className="product-title">quantity</h6> */}
                                <div className="counter-cont" style={{ width: '160px', }}>
                                    {/* <CounterInput min={1} value={product.qty} onChange={value => dispatch(cartActions.addCart({ productQuantity: value, product: product, check: value }))} /> */}

                                </div>
                            </div>
                        }
                    </div>

                    <div className="product-buttons d-flex">
                        {!(product.category.name === 'Automobile' || product.category.name === 'Real Estate') &&
                            <button type='button' onClick={() => dispatch(cartActions.addCart(product))} id="cartEffect" data-bs-toggle="modal" data-bs-target="#PlaceOrderModal" className=" text-nowrap text-sm-cashiet btn btn-solid p-1 rounded my-2 mx-2">
                                <i className="fa fa-shopping-cart me-3  text-sm" aria-hidden="true" /> add to cart
                            </button>
                        }
                        {/* <CounterInput min={1} value={product.qty ?? 1} onChange={value => { dispatch(cartActions.addCart({ productQuantity: value, product: product, check: value })); console.log(product); }} /> */}

                        <button onClick={(e) => addToWhishlist(product._id)} className="btn btn-solid p-2 rounded my-2 text-nowrap text-sm-cashiet">
                            <i className="fa fa-bookmark fz-16 me-2 " aria-hidden="true" /><span className="text-sm-cashiet text-nowrap text-sm-cashiet">ADD TO wishlist</span>
                        </button>

                    </div>
                    {(product.category.name === 'Automobile' || product.category.name === 'Real Estate') &&

                        <Link to={`/check-out/?p_i=${product._id}/?n_p=${product.slug}`} className="placeholder-glow block btn btn-solid p-2 rounded m-2  text-nowrap text-sm-cashiet m-2">
                            checkout
                        </Link>
                    }


                    <><h4 className="product-title mb-2 mt-4">Available Payment options</h4>

                        <div className="product-buttons d-flex flex-wrap">
                            {product.availablePaymentOptions.map((option, index) => (

                                <div className="" key={index}>

                                    <button
                                        className="btn  p-2 rounded optionStyle m-2 text-sm-cashiet nowrap mb-1"
                                        style={{ border: '1px solid green' }}
                                        onClick={() => navigate(`/check-out?paymentOption=${option._id}&type=${option.type}`)}
                                    >
                                        {option.type === 'buy_now' ? 'Buy now' : option.type === 'pay_later' ? 'pay later ' : 'save and buy later'}
                                    </button>

                                </div>
                            ))}

                        </div>
                    </>
                    <div className="product-buttons d-flex">
                        {product.availablePaymentOptions.length < 1 &&
                            <div className="">

                                <button className="btn  p-2 rounded optionStyle m-2" style={{ border: '1px solid green' }}>
                                    <span className="text-sm-cashiet">Not available</span>
                                </button>


                            </div>
                        }
                    </div>
                </div>
                <section className="tab-product m-0">
                    <div className="row">
                        <div className="col-sm-12 col-lg-12">
                            <ul className="nav nav-tabs nav-material" id="top-tab" role="tablist">
                                <li className="nav-item"><a className="nav-link active" id="top-home-tab" data-bs-toggle="tab" href="#top-home" role="tab" aria-selected="true"><i className="icofont icofont-ui-home" />Description</a>
                                    <div className="material-border" />
                                </li>
                                <li className="nav-item"><a className="nav-link" id="profile-top-tab" data-bs-toggle="tab" href="#top-profile" role="tab" aria-selected="false"><i className="icofont icofont-man-in-glasses" />Reviews</a>
                                    <div className="material-border" />
                                </li>
                                <li className="nav-item"><a className="nav-link" id="review-top-tab" data-bs-toggle="tab" href="#top-review" role="tab" aria-selected="false"><i className="icofont icofont-contacts" />Write
                                    Review</a>
                                    <div className="material-border" />
                                </li>
                            </ul>
                            <div className="tab-content nav-material" id="top-tabContent">
                                <div className="tab-pane fade show active" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                                    <div className="product-tab-discription">
                                        <div className="part">q
                                            <div> {parse(product.description)} </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                                    <p>The Model is wearing a white blouse from our stylist's collection, see
                                        the image for a mock-up of what the actual blouse would look like.it has
                                        text written on it in a black cursive language which looks great on a
                                        white color.
                                    </p>

                                </div>
                                <div className="tab-pane fade" id="top-review" role="tabpanel" aria-labelledby="review-top-tab">
                                    <form className="theme-form">
                                        <div className="form-row row">
                                            <div className="col-md-12">
                                                <div className="media">
                                                    <label>Rating</label>
                                                    <div className="media-body ms-3">
                                                        <div className="rating three-star"><i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" className="form-control" id="name" placeholder="Enter Your name" required />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control" id="email" placeholder="Email" required />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="review">Review Title</label>
                                                <input type="text" className="form-control" id="review" placeholder="Enter your Review Subjects" required />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="review">Review Title</label>
                                                <textarea className="form-control" placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" rows={6} defaultValue={""} />
                                            </div>
                                            <div className="col-md-12">
                                                <button className="btn btn-solid" type="submit">Submit YOur
                                                    Review</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </>
    );
}

export default SingleProduct;