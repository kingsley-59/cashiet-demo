import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const NabarCart = () => {
    const cart = useSelector(state => state.cart.storageItems)
    const dispatch = useDispatch();
    let subTotal = []
    cart.map((item)=>{
        subTotal.push(item.total)
    })
    return (
        <>
        { cart.length > 0 && 
        <ul className="show-div shopping-cart">
            {cart && cart.slice(0,2).map((item, key) => (
                <li key={key}>
                    <div className="media">
                        <a href="/cart"><img alt="" className="me-3"
                                src={item.image? item.image.url : ''} /></a>
                        <div className="media-body">
                            <a href="/">
                                <h6>{item.name}</h6>
                            </a>
                            <h4>
                                <span>
                                    {item.qty} x {item.price} <br></br>
                                    <CurrencyFormat  value={item.total} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                                </span>
                            </h4>
                        </div>
                    </div>
                    <div className="close-circle">
                        <p type="button" onClick={e=>dispatch(cartActions.removeFromCart(item))} href="/">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </p>
                    </div>
                </li>
            ))}
            <li>
                <div className="total">
                    <h5>subtotal : 
                        <span><CurrencyFormat  value={subTotal ? subTotal.reduce((sum, current) => sum + current, 0) : 0} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></span>
                    </h5>
                </div>
            </li>
            <li>
                <div className="buttons">
                    <a href="/cart" className="view-cart"> view cart </a> 
                    <a href="/check-out" className="checkout">checkout</a>
                </div>
            </li>
        </ul>
        }
        { cart.length === 0 && 
             <ul className="show-div shopping-cart">
                <li> You have no  items available </li>
             </ul>
        }
        </>
    )
}

export default NabarCart;