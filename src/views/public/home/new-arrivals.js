import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CurrencyFormat from "react-currency-format";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import httpService from "../../../services/http-service";
import OwlCarousel from "react-owl-carousel";
import "../../../assets/css/owl.carousel.css";
import "../../../assets/css/owl.theme.default.css";
import CartService from "../../../services/cartService";
import parse from 'html-react-parser';
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";

const NewArrivals = () => {
  const options = {
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 1,
      },
      400: {
        items: 2,
      },
      1000: {
        items: 4,
      }
    },
  }
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  let addToCart = CartService.addCart;
  const [quantity, setQuantity] = useState(0);
  const [modalproduct, setModalProduct] = useState({})
  const dispatch = useDispatch()
  const getProducts = async (limit) => {
    setLoading(true);

    try {
      const response = await httpService.get(
        '/products/new-arrivals?limit=' + limit
      );
      if (response.status === 200) {
        var data = response.data.products;
        var result = data.results ? data.results : data;
        setProducts([...result]);

        setLoading(false);
      }
    } catch (e) {
      toast.error("Oopps!, Network error");
      setLoading(false);
    }
  };

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
      setLoading(false)
      toast.error('Unable to add to wishlist now, please try again');

      // toast.error(e.response.data.message);
    }
  }

  useEffect(() => {
    getProducts(limit);
  }, []);

  return (
    <section className="section-b-space pt-0 ratio_asos">
      <div className="container">
        <div className="row">
          <div className="col-12">

            <div className="container-fluid">
              {!Loading &&
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={10}
                  items={4}
                  autoplay={true}
                  nav
                  {...options}
                >
                  {products &&
                    products.map((product) => (
                      <div key={product._id} className="product-box">
                        <div >
                          <div className="img-wrapper">
                            <div className="front">
                              <a href="/">
                                <img
                                  src={product.image.url}
                                  className="img-fluid blur-up lazyload "
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="back">
                              <a href={"/product/" + product._id}>
                                <img
                                  src={product.image.url}
                                  className="img-fluid blur-up lazyload "
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="">
                              <div className="cart-info cart-wrap cart-dropshadow">
                              {!(product.category.name === "Automobile" || product.category.name === "Real Estate") && (
                                <button
                                  onClick={() => dispatch(cartActions.addCart(product))}
                                  title="Add to cart"
                                >
                                  <i className="ti-shopping-cart"></i>
                                </button>
                              )}
                                <span title="Add to Wishlist"
                                  onClick={(e) => addToWhishlist(product._id)}
                                >
                                  <i className="ti-heart" aria-hidden="true"></i>
                                </span>
                                {/* <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#quick-view"
                                  title="Quick View"
                                  onClick={() => setModalProduct(product)}
                                >
                                  <i className="ti-search" aria-hidden="true"></i>
                                </a> */}
                               
                              </div>
                            </div>
                          </div>
                          <div className="product-detail">
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <a href="/">
                              <h6>{product.name}</h6>
                            </a>
                            <h4>
                              <CurrencyFormat
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₦"}
                              />
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}

                </OwlCarousel>
              }
            </div>


            {Loading &&
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                items={4}
                autoplay={true}
                nav
              >
                {Array.from(Array(8), (e, key) => (

                  <div key={key} className="product-box">
                    <Skeleton
                      height={250}
                      count={1}
                      className="skeleton-cont"
                    ></Skeleton>
                    <Skeleton height={10} count={1} width={150}></Skeleton>
                    <Skeleton height={10} count={2} width={90}></Skeleton>
                  </div>

                ))}
              </OwlCarousel>
            }
          </div>
        </div>
      </div>
      {/* Quick-view modal popup start*/}
      <div
        className="modal fade bd-example-modal-lg theme-modal"
        id="quick-view"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content quick-view-modal">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              {modalproduct &&
                <div className="row">
                  <div className="col-lg-6 col-xs-12">
                    <div className="quick-view-img">
                      <img
                        src={modalproduct.image ? modalproduct.image.url : ''}
                        alt=""
                        className="img-fluid blur-up lazyload"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 rtl-text">
                    <div className="product-right">
                      <h2> {modalproduct.name} </h2>
                      <h3>
                        <CurrencyFormat value={modalproduct.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                      </h3>
                      <ul className="color-variant">
                        <li className="bg-light0" />
                        <li className="bg-light1" />
                        <li className="bg-light2" />
                      </ul>
                      <div className="border-product">
                        <h6 className="product-title">product details</h6>
                        <p>
                          {/* { parse(modalproduct.description) } */}
                        </p>
                      </div>
                      {/* <div className="product-description border-product">
                                  <h6 className="product-title">quantity</h6>
                                  <div className="qty-box">
                                      <div className="input-group">
                                          <span className="input-group-prepend">
                                              <button
                                              type="button"
                                              className="btn quantity-left-minus"
                                              data-type="minus"
                                              data-field
                                              onClick={(e) => setQuantity(quantity - 1) }
                                              >
                                              <i className="ti-angle-left" />
                                              </button>{" "}
                                          </span>
                                          <input
                                              type="text"
                                              name="quantity"
                                              className="form-control input-number"
                                              defaultValue={1}
                                              onChange={(e) => setQuantity(e.target.value)}
                                          />{" "}
                                          <span className="input-group-prepend">
                                              <button
                                              type="button"
                                              className="btn quantity-right-plus"
                                              data-type="plus"
                                              data-field
                                              onClick={(e) => setQuantity(quantity + 1) }
                                              >
                                              <i className="ti-angle-right" />
                                              </button>
                                          </span>
                                      </div>
                                  </div>
                              </div> */}
                      <div className="product-buttons">
                        <a href="#" className="btn btn-solid"
                          onClick={() => dispatch(cartActions.addCart(modalproduct))}
                        >
                          add to cart 
                        </a>{" "}
                        <a href={'/product/' + modalproduct._id} className="btn btn-solid">
                          view detail
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {/* Quick-view modal popup end*/}
    </section>
  );
};

export default NewArrivals;
