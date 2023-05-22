/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import httpService from "../../../services/http-service";
import toast from "react-hot-toast";
import Breadcrumb from "../../../views/layouts/breadcrumb";
import CurrencyFormat from 'react-currency-format';

const Order = () => {
    const navigate = useNavigate()
    let _id = useParams()
    let url = '/order/' + _id.id
    let txnUrl = '/transactions/order/' + _id.id;
    const [Loading, setLoading] = useState(false);
    const [Order, setOrder] = useState({});
    const [viewOrder, setViewOder] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [invoice, setInvoice] = useState({})
    const [mandateSuccess, setMandateSuccess] = useState(false);
    const [orderTransactions, setOrderTransactions] = useState([])
    const [orderTxnsError, setOrderTxnsError] = useState('')

    const getOrder = async () => {

        setLoading(true);

        try {
            const txnResponse = await httpService.get(txnUrl);
            if (txnResponse.status !== 200) throw new Error('Could not fetch order transactions.')
            setOrderTransactions(txnResponse.data.allTransactions)
        } catch (error) {
            setOrderTxnsError(error?.message)
        }

        try {
            const response = await httpService.get(url);

            if (response.status === 200) {
                setLoading(false);
                let resp = response.data.order;
                setOrder(resp)
                setOrderId(resp._id)
                setInvoice(response.data.invoice)
            }
            else {
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
        }
    };
    const CancelOrder = async (e) => {

        try {
            const response = await httpService.post({ endpoint: '/order/' + e, details: orderId })
            if (response.status === 200) {
                setLoading(false);
                toast.success('Successfully cancelled order');
                window.location.href = "/dashboard"

            }
            else {
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
        }
    }
    useEffect(() => {
        getOrder();
    }, []);
    return (
        <>
            {/* breadcrumb start  */}
            <Breadcrumb title="Order Details" breadcrumbItem="Order" />
            {/* breadcrumb End  */}

            {/* dashboard section start  */}
            <section className="dashboard-section section-b-space user-dashboard-section">
                <div className="container">
                    <div className="page-body">

                        {/* Container-fluid starts*/}
                        <div className="container-fluid">
                            <div className="card">
                                {Loading &&
                                    <div className="overflow-hidden d-block p-5">
                                        <div className="">
                                            <Skeleton count={1} width={100} height={10} box={true} />
                                            <Skeleton count={1} width={1000} height={5} box={true} />
                                            <Skeleton count={1} width={160} height={8} box={true} />
                                            <Skeleton count={1} width={200} height={8} box={true} />
                                        </div>
                                        <div className="d-flex p-2">
                                            <Skeleton count={1} width={300} height={100} box={true} />
                                            <div className="d-flex px-2">
                                                <Skeleton count={2} width={100} height={50} box={true} />
                                            </div>
                                        </div>
                                        <Skeleton count={1} width={200} height={8} box={true} />
                                    </div>

                                }
                                {(Order && Loading === false) &&
                                    <div className="row product-page-main card-body ">

                                        <div className="col-xl-12">
                                            <div className="product-page-details product-left mb-0 text-left align-baseline">
                                                <div className="row justify-content-between">
                                                    <div className="col-auto">
                                                        <h4 className="fw-bold">product details</h4>
                                                    </div>
                                                    <div className="col-auto">
                                                        <span>Status:</span>
                                                        {Order.status === 'cancelled' ? (
                                                            <span className=" text-danger "> {Order.status}</span>
                                                        ) : Order.status === 'pending' ? (
                                                            <span className=" text-primary "> {Order.status}</span>
                                                        ) : (
                                                            <span className=" text-success "> {Order.status}</span>
                                                        )}
                                                        <br />
                                                        <span className="text-danger">Remaining Amount: <CurrencyFormat value={Order?.remainingAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} className="text-success text-danger" /></span>
                                                    </div>
                                                </div>

                                                {Order.orderItems?.map((product) => (
                                                    <div key={product._id}>
                                                        <div>
                                                            <p className="d-flex ">Product name: {product.product ? <p className="text-success">{product.product.name}</p> : <p className="text-danger text-9">Not available</p>}</p>
                                                            <p className="d-flex">Product unitPrice: {product.product ? <CurrencyFormat c value={product.unitPrice} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> : <p className="text-danger">Not available</p>}</p>
                                                            <p>quantity:{product.quantity}</p>
                                                            <p>Total Price:<CurrencyFormat value={Order.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></p>
                                                            <p>Shipping fee:<CurrencyFormat value={Order.shippingFee} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></p>
                                                            <p>Amount paid: <CurrencyFormat value={Order.totalAmount - Order?.remainingAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></p>
                                                            <p>Amount remaining: <CurrencyFormat value={Order?.remainingAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></p>
                                                            {Order?.recurringPayment && <p>Duration: {Order?.recurringPayment?.duration} </p>}
                                                            {Order?.recurringPayment && <p>End Date: {new Date(Order?.recurringPayment?.endDate).toLocaleDateString()}</p>}
                                                            <hr />
                                                        </div>

                                                    </div>
                                                ))}
                                                <div>
                                                    <h4 className="fw-bold">Delivery Address</h4>
                                                    <p>city: {Order.deliveryAddress?.city}</p>
                                                    <p>country: {Order.deliveryAddress?.country}</p>
                                                    <p>Email: {Order.deliveryAddress?.email}</p>
                                                    <p>Line 1: {Order.deliveryAddress?.line1}</p>
                                                    <p>Line 2: {Order.deliveryAddress?.line2}</p>
                                                    <p>Phone: {Order.deliveryAddress?.phoneNumber}</p>
                                                    <p>State: {Order.deliveryAddress?.state}</p>
                                                    <p>Zip code : {Order.deliveryAddress?.zip}</p>
                                                    <hr />
                                                </div>
                                                <h4 className="fw-bold">Delivery Details</h4>
                                                <p>Delivery date: {Order.deliveryDate}</p>
                                                <p>Delivery status: {Order.deliveryStatus}</p>
                                                <p>Failed transactions: {Order.failedTransactions}</p>
                                                <p>Order date: {Order.orderDate}</p>
                                                <hr />

                                                <div>
                                                    <h6 className="product-title ">User Details</h6>
                                                    {Order.user ? <div><p>User name: {Order.user.username}</p>
                                                        <p>Email: {Order.user.email}</p>
                                                    </div> : "User not available"
                                                    }
                                                    <h6>Order transactions</h6>
                                                    {orderTxnsError ? (
                                                        <span className="text-danger">An error occurred while fetching transactions</span>
                                                    ) : orderTransactions.length > 0 ? (
                                                        <>
                                                            <span className="text-success">You have made {orderTransactions.length} for this order.</span>
                                                            {orderTransactions.map((txn, idx) => (
                                                                <div className="d-flex justify-content-start">
                                                                    <span>{txn?.responseData?.amount}</span>
                                                                    <span>{txn?.responseData?.paymentDate}</span>
                                                                    <span>{txn?.responseData?.paymentState}</span>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <span className="text-secondary">There are no transactions for this order.</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="d-flex flex-wrap float-end mt-3 pb-6 " style={{ width: 'fit-content' }}>
                                {Order.status === 'pending' ? (
                                    <button className="btn btn-solid d-block  optionStyle mx-2" onClick={() => {
                                        navigate(`/payments/${invoice._id}`)
                                    }} >
                                        {Order?.paymentOption?.name ?? 'Proceed to Payment'}
                                    </button>
                                ) : (
                                    <button className="btn btn-solid d-block  optionStyle mx-2" onClick={() => {
                                        navigate(-1)
                                    }} >
                                        Back
                                    </button>
                                )}
                                <button onClick={e => CancelOrder(Order._id)} className="btn btn-danger btn-solid  optionStyle" >
                                    Cancel
                                </button>
                                {/* {(Order.status === 'paid' || Order.paymentStatus === 'part_payment') && (
                                    <button className="btn btn-solid d-block  optionStyle mx-2" >
                                        Track Order
                                    </button>
                                )} */}
                            </div>
                        </div>
                        {/* Container-fluid Ends*/}
                    </div>
                </div>
            </section>

        </>
    );
}

export default Order;