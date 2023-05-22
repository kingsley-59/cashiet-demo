/* eslint-disable jsx-a11y/anchor-is-valid */
import Breadcrumb from "../layouts/breadcrumb";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../services/http-service";
// import EditAddress from "../../dashboard/components/address/edit";
import CurrencyFormat from "react-currency-format";
import { useSelector, useDispatch } from "react-redux";
// import SetupMandateModal from "../../dashboard/components/mandates/setupMandateModal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React from "react";
// import BuyNow from "../../dashboard/components/payments/buyNow";
import CheckOutAddress from "./checkout-address";
import addMonths from "../../utils/addMonths";
import { useRef } from "react";


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Checkout = () => {
    const navigate = useNavigate()
    const createOrderBtnRef = useRef(null)
    const showOrderModalBtnRef = useRef(null)
    const closeOrderModalRef = useRef(null)
    const showPendingOrderModalRef = useRef(null)
    const closePendingOrderModalRef = useRef(null)

    const [queryParams, setQueryParams] = useSearchParams()
    let productId = useQuery().get("p_i");

    const [pendingOrder, setPendingOrder] = useState(null)
    let [fetchedProduct, setFetchedProduct] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [orderAddr, setOrderAddr] = useState({});
    const [address, setAddress] = useState({});
    const [orderId, setOrderId] = useState("");
    const [paymentOption, setPaymentOption] = useState("");
    const [paymentOptionName, setPaymentOptionName] = useState("");
    const dispatch = useDispatch();
    let orderItems = [];
    let subTotal = [];
    let tempPaymentOptions = [];
    let paymentOptions = [];

    const temCart = useSelector((state) => state.cart.storageItems);

    const getproduct = () => {
        httpService
            .get("/products/" + productId)
            .then((data) => {
                let resp = data.data.product;
                setFetchedProduct([{ ...resp, total: resp.price, qty: 1 }]);
            })
            .catch((error) => { });
    };
    const cart = fetchedProduct == null ? temCart : fetchedProduct;
    cart?.map((item) => {
        subTotal.push(item.total);
        orderItems.push({
            product: item._id,
            unitPrice: item.price,
            quantity: item.qty,
        });

        //first retrieve all paymentoptions without double entry
        item.availablePaymentOptions.forEach((option) => {
            if (tempPaymentOptions.find((e) => e._id === option._id) == null) {
                tempPaymentOptions.push(option);
            }
        });
        return subTotal;
    });

    tempPaymentOptions.forEach((option) => {
        if (cart.filter((item) => item.availablePaymentOptions.find((opt) => opt._id === option._id)).length === cart.length) {
            paymentOptions.push(option);
        }
    });

    let order = {
        orderDate: "",
        orderItems: {},
        deliveryAddress: {},
        shippingFee: "",
        deliveryDate: "",
        paymentOption: "62724b4007c9bcdf007594e3",
        totalAmount: 0,
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderAddr((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const createOrder = async (e) => {
        setLoading(true);
        e.preventDefault();
        const itemsTotal = subTotal.reduce((sum, current) => sum + current, 0)
        console.log(itemsTotal)

        order = {
            orderDate: new Date(),
            orderItems: orderItems,
            deliveryAddress: orderAddr,
            shippingFee: 300,
            deliveryDate: addMonths(new Date(), 3),
            paymentOption: paymentOption,
            totalAmount: itemsTotal + 300,
            duration: 3,
            splitAmount: paymentOption !== 'buy_now' && (itemsTotal + 300) / 3
        };

        if (Object.keys(order.deliveryAddress).length === 0) {
            toast.error("You must have a delivery address");
            return;
        }

        try {
            const response = await httpService.post({ endpoint: "/order", details: order });
            if (response.status !== 201) throw new Error(response.data?.messge)
            setLoading(false);
            setOrderId(response?.data?.order._id);
            closeOrderModalRef.current.click();
            toast.success("Order created successfully");
            navigate(`/payments/${response?.data?.invoice._id}`)
        } catch (e) {
            setLoading(false);
            closeOrderModalRef.current.click();
            toast.error(e.response?.data?.message ?? e.message);

            if (e.response?.data?.pendingOrder) {
                const pending = e.response?.data?.pendingOrder
                console.log(pending)
                setPendingOrder(pending)
                showPendingOrderModalRef.current.click()
            }
        }
    };

    const getAddresses = async () => {
        setLoading(true);

        try {
            const response = await httpService.get("/address/me");
            if (response.status === 200) {
                setOrderAddr(response.data.addresses[0]);
                setAddresses(response.data.addresses);
            }
            setLoading(false);
        } catch (e) {
            toast.error("Oopps, server error");
            setLoading(false);
        }
    };

    const CancelOrder = async () => {

        try {
            const response = await httpService.post({ endpoint: '/order/' + pendingOrder._id, details: pendingOrder._id })
            if (response.status === 200) {
                setLoading(false);
                toast.success('Successfully cancelled order');
                closePendingOrderModalRef.current.click()
                createOrderBtnRef.current.click()
            }
            else {
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data?.message);
        }
    }

    useEffect(() => {
        function fillOptionsFromQueryParams() {
            setPaymentOption(queryParams.get('paymentOption'))
            setPaymentOptionName(queryParams.get('type'))

            if (addresses.length > 0 && paymentOption) {
                showOrderModalBtnRef.current.click()
            }
        }

        !paymentOption && fillOptionsFromQueryParams()
    }, [addresses, paymentOption, queryParams])

    useEffect(() => {
        getAddresses();
        if (productId !== null) {
            getproduct();
        }
    }, []);

    return (
        <>
            {/* breadcrumb start */}
            <Breadcrumb title="Check-out" breadcrumbItem="Check-out" />
            {/* breadcrumb End */}

            {/* section start */}
            <section className="section-b-space">
                <div className="container">
                    <div className="checkout-page">
                        <div className="checkout-form">

                            <form method="submit" onSubmit={createOrder}>
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12 col-xs-12">
                                        <div className="checkout-title">
                                            <h3>Billing Details</h3>
                                        </div>

                                        {orderAddr && (
                                            <div className="chk-addr-wrap mb-3">
                                                <div className="d-flex justify-content-between ">
                                                    <h4>Address Details</h4>
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#chkAddr" title="Quick View" className="edit-link">
                                                        Change
                                                    </a>
                                                </div>
                                                <div>
                                                    <p className="mb-1">{orderAddr.email}</p>
                                                    <p> {orderAddr.line1} </p>
                                                </div>
                                            </div>
                                        )}
                                        {orderAddr && (
                                            <CheckOutAddress orderAddr={orderAddr} handleInputChange={handleInputChange} addresses={addresses} getAddresses={getAddresses} setAddress={setAddress} address={address} setOrderAddr={setOrderAddr} />
                                        )}
                                        {!orderAddr && <><h4 className="pe-5 text-danger">please go to dashboard on profile tab to complete your address and profile</h4></>}
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-xs-12">
                                        <div className="checkout-details">
                                            <div className="order-box">
                                                <div className="title-box">
                                                    <div>
                                                        Product <span>Total</span>
                                                    </div>
                                                </div>
                                                <ul className="qty">
                                                    {cart &&
                                                        cart.map((item, key) => (
                                                            <li key={key}>
                                                                {item.name} × {item.qty} <span>₦{item.total}.00</span>
                                                            </li>
                                                        ))}
                                                </ul>
                                                <ul className="sub-total">
                                                    <li>
                                                        Subtotal
                                                        <CurrencyFormat className="count" value={subTotal ? subTotal.reduce((sum, current) => sum + current, 0) : 0} displayType={"text"} thousandSeparator={true} prefix={"₦"} />
                                                    </li>
                                                    <li>
                                                        Shipping
                                                        <div className="shipping">
                                                            <div className="shopping-option">
                                                                <input type="checkbox" name="free-shipping" id="free-shipping" />
                                                                <label htmlFor="free-shipping">Free Shipping</label>
                                                            </div>
                                                            <div className="shopping-option">
                                                                <input type="checkbox" name="local-pickup" id="local-pickup" />
                                                                <label htmlFor="local-pickup">Local Pickup</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <ul className="total">
                                                    <CurrencyFormat className="count" value={subTotal ? subTotal.reduce((sum, current) => sum + current, 0) : 0} displayType={"text"} thousandSeparator={true} prefix={"₦"} />
                                                </ul>
                                            </div>
                                            <div className="payment-box">
                                                <div className="upper-box">
                                                    <div className="payment-options">
                                                        <p>
                                                            Choose your desired payment option. <span className="text-danger">Only one is allowed</span>
                                                        </p>
                                                        <ul>
                                                            {paymentOptions &&
                                                                paymentOptions.map((option, key) => (
                                                                    <li key={key}>
                                                                        <div className="radio-option">
                                                                            <input type="radio" required checked={(paymentOption === option._id)} value={option._id} name="payment-group" id={option._id} onChange={(e) => { setPaymentOption(e.target.value); setPaymentOptionName(option.type) }} />
                                                                            <label htmlFor={option._id}>
                                                                                {option.type}
                                                                                <span className="small-text">{option.description}</span>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {orderAddr && <div className="text-end">
                                                    <button type="submit" ref={createOrderBtnRef} className="btn-solid btn">
                                                        Place Order
                                                    </button>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>

            {/* section end */}

            <button ref={showOrderModalBtnRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#PlaceOrderModal">
                Launch demo modal
            </button>

            <button ref={showPendingOrderModalRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#PendingOrderModal">
                Show pending order
            </button>

            {/* Modal */}
            <div class="modal fade" id="PlaceOrderModal" tabindex="-1" aria-labelledby="placeOrderModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        {/* <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div className="modal-body p-5 text-center">
                            <button ref={closeOrderModalRef} type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x fs-4 fw-bold border border-1 rounded-3 border-dark"></i>
                            </button>
                            <h3 className="mb-3">Proceed to Payment!</h3>
                            <div className="w-100 text-center">
                                <button className="btn btn-success text-white rounded-3 p-3" onClick={createOrder}>
                                    {Loading ? 'Loading...' : 'Place Order'}
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

            {/* Modal */}
            <div class="modal fade" id="PendingOrderModal" tabindex="-1" aria-labelledby="pendingOrderModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        {/* <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div className="modal-body p-5 text-center">
                            <button ref={closePendingOrderModalRef} type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x fs-4 fw-bold border border-1 rounded-3 border-dark"></i>
                            </button>
                            <h3>You have a pending order!</h3>
                            <p className="mb-3">What would you like to do next?</p>
                            <div className="w-100 text-center d-flex justify-content-between align-items-center">
                                <button className="btn btn-success text-white rounded-3 p-3" onClick={() => {
                                    closePendingOrderModalRef.current.click(); 
                                    navigate(`/order/${pendingOrder?._id}`)
                                }}>
                                    {'See order'}
                                </button>
                                <button className="btn btn-danger text-white rounded-3 p-3" onClick={CancelOrder}>
                                    {'Cancel order'}
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

        </>
    );
};

export default Checkout;
