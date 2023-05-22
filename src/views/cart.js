import Breadcrumb from "./layouts/breadcrumb";
import CurrencyFormat from 'react-currency-format';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import CounterInput from 'react-bootstrap-counter';


const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.storageItems)
  // const [disableInput, setDisableInput] = useState(true);
  let subTotal = []
  cart.map((item) => {
    subTotal.push(item.total)
    return subTotal;
  })
  const updateQuantity = (e) => {
    if (e.check < 1) {
      return;
    } else {

      dispatch(cartActions.addCart(e))

    }
  }
  return (
    <>

      {/* breadcrumb start */}
      <Breadcrumb title="Cart" breadcrumbItem="Cart" />
      {/* breadcrumb End */}

      {/* section star */}
      <section className="cart-section section-b-space">
        <div className="container">
          <div className="row">

            { }
            <div className="col-sm-12 table-responsive-xs">
              <table className="table cart-table">
                <thead>
                  <tr className="table-head">
                    <th scope="col">image</th>
                    <th scope="col">product name</th>
                    <th scope="col">amount</th>
                    <th scope="col">quantity</th>
                    <th scope="col">action</th>
                    <th scope="col">total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.map((item, key) => (
                      <tr key={key}>

                        <td>
                          <a href={"/product/" + item._id}>
                            <img src={item.image ? item.image.url : ''} alt="" />
                          </a>
                        </td>

                        <td>

                          <a href={"/product/" + item._id}>{item.name}</a>

                          <div className="mobile-cart-content row">
                            <div className="col">
                              <div className="qty-box">
                                <div className="w-2 my-3" style={{ width: '160px' }}>
                                  <CounterInput min={1} value={item.qty ?? 1} onChange={value => { dispatch(cartActions.addCart({ productQuantity: value, product: item, check: value }));  }} />
                                </div>
                              </div>
                            </div>
                            <div className="col">

                              <h2 className="td-color">
                                <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                              </h2>

                            </div>
                            <div className="col">
                              <span
                                onClick={(e) => dispatch(cartActions.removeFromCart(item))}
                                href="/cart"
                                className="icon"
                              >
                                <i className="ti-close"></i>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>

                          <h2>
                            <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                          </h2>

                        </td>
                        <td>
                          <div className="qty-box">

                            <div className="w-2 my-3" style={{ width: '160px' }}>
                              <CounterInput min={1} value={item.qty ?? 1} onChange={value => { dispatch(cartActions.addCart({ productQuantity: value, product: item, check: value })); }} />
                            </div>
                          </div>
                        </td>
                        <td>

                          <span
                            onClick={(e) => dispatch(cartActions.removeFromCart(item))}
                            href="/cart"
                            className="icon"
                          >
                            <i className="ti-close"></i>
                          </span>

                        </td>
                        <td>

                          <h2 className="td-color">
                            <CurrencyFormat value={item.total} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                          </h2>

                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {cart.length === 0 && (
                <p
                  className="text-center mt-4 text-lg "
                  style={{ fontSize: "16px" }}
                >
                  You have no item in your cart
                </p>
              )}
              <div className="table-responsive-md">
                <table className="table cart-table ">
                  <tfoot>
                    <tr>
                      <td>total amount :</td>
                      <td>
                        <h2>
                          <CurrencyFormat className="product-price" value={subTotal ? subTotal.reduce((sum, current) => sum + current, 0) : 0} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                        </h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="row cart-buttons">
            <div className="col-6">
              <a href="/products" className="btn btn-solid">
                continue shopping
              </a>
            </div>
            <div className="col-6">
              <a href="/check-out" className="btn btn-solid">
                check out
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* section en */}

    </>
  );
};

export default Cart;
