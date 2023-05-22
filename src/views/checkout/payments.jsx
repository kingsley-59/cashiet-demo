import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import httpService from "../../services/http-service"
import Breadcrumb from "../layouts/breadcrumb"
import { PaystackButton } from 'react-paystack'

const paystackKey = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PAYSTACK_TEST_KEY : process.env.REACT_APP_PAYSTACK_LIVE_KEY

const Payments = () => {
    const navigate = useNavigate()
    const { invoiceId } = useParams()
    const [order, setOrder] = useState({})
    const [paymentOption, setPaymentOption] = useState('')
    const [cardDetails, setCardDetails] = useState([])
    const [showCard, setShowCard] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentError, setPaymentError] = useState('')

    const buyNowBtnProps = useMemo(() => {
        return {
            email: order?.deliveryAddress?.email,
            amount: Number(order?.totalAmount) * 100,
            metadata: {
                name: order?.user?.username,
                phone: order?.deliveryAddress?.phoneNumber,
            },
            publicKey: paystackKey,
            text: "Pay Now",
            onSuccess: function (response) {
                console.log(response)
                const { reference, status: txnStatus, message } = response
                if (txnStatus !== 'success') { toast.error(message); return; }

                async function saveTransaction() {
                    const toastId = toast.loading('Saving transaciton...')
                    try {
                        let options = {
                            endpoint: `/transactions/`, details: {
                                reference, invoiceId,
                                orderId: order._id
                            }
                        }
                        const { status, data } = await httpService.post(options)
                        if (status === 201) {
                            toast.success(data.message, { id: toastId })
                            setTimeout(() => navigate('/dashboard'))
                        } else throw new Error(data.message)
                    } catch (error) {
                        console.log(error?.response?.data?.message)
                        toast.error(error?.response?.data?.message ?? error.message, { id: toastId })
                    }
                }

                saveTransaction()
            },
            onClose: () => { },
        }
    }, [invoiceId, order, navigate])

    const addCardBtnProps = useMemo(() => {
        return {
            email: order?.deliveryAddress?.email,
            amount: 50 * 100,
            metadata: {
                name: order?.user?.username,
                phone: order?.deliveryAddress?.phoneNumber,
            },
            publicKey: paystackKey,
            text: "Add Card",
            onSuccess: function (response) {
                const { reference, status: txnStatus, message } = response
                if (txnStatus !== 'success') { toast.error(message); return; }

                async function verifyTransaction() {
                    const toastId = toast.loading('Verifying transaciton...')
                    try {
                        if (!reference) throw new Error('Something went wrong. Please try again later.')
                        const { status, data } = await httpService.get(`/payments/verify/${reference}`)
                        if (status === 200) {
                            toast.success(data.message, { id: toastId })
                            setCardDetails(data.data)
                        } else throw new Error(data.message)
                    } catch (error) {
                        toast.error(error?.response?.data?.message ?? error.message, { id: toastId })
                    }
                }

                verifyTransaction()
            },
            onClose: () => {
                setShowCard(true)
            },
        }
    }, [order])

    const processPayment = async (cardId) => {
        const toastId = toast.loading('Processing payment...')

        try {
            let options = {
                endpoint: `/payments/`, details: {
                    orderId: order._id,
                    cardId
                }
            }
            const { status, data } = await httpService.post(options)
            console.log({data})
            if (status === 200) {
                toast.success(data.message, { id: toastId })
                navigate('/dashboard')
            } else throw new Error(data.message)
        } catch (error) {
            console.log(error)
            setPaymentError(error)
            toast.error(error?.response?.data?.message ?? error.message, { id: toastId })
        }
    }

    const handleCheckout = async () => {
        setLoading(true)

        try {
            const { status, data } = await httpService.get(`/payments/user`)
            if (status !== 200) throw new Error(data?.message ?? 'Could not fetch payment details')
            setCardDetails(data?.data)
            setShowCard(true)
            setLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error.message)
            setLoading(false)
            setShowCard(true)
        }
    }

    useEffect(() => {
        async function fetchInvoiceDetails() {
            setLoading(true)
            try {
                const { status, data } = await httpService.get(`/invoice/${invoiceId}`)
                if (status !== 200) throw new Error(data?.message ?? 'Could not fetch order details.')
                setOrder(data?.invoice.order)
                setPaymentOption(data?.invoice.order.paymentOption.type)
                setLoading(false)
                console.log(data)
            } catch (error) {
                toast.error(error?.response?.data?.message ?? error.message)
                setLoading(false)
            }
        }
        fetchInvoiceDetails()
    }, [invoiceId])

    return (
        <>
            <Breadcrumb title={'Payments'} breadcrumbItem={'Payments'} />

            <div className="container my-auto">
                <div className="h3 mb-5 py-3">Complete Checkout</div>
                <div className="mx-auto container-md" style={{ maxWidth: '768px' }}>
                    <h4>Order details</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price(N)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.orderItems?.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{item.product.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unitPrice}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="fw-bold">Total</td>
                                <td className="fw-bold text-end" colSpan={3}>{order.totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-100 text-end mb-3">
                        {paymentOption === 'buy_now' ? (
                            <PaystackButton className="btn btn-info px-3 rounded-3" {...buyNowBtnProps} />
                        ) : (
                            <button className="btn btn-success p-3 rounded-3" onClick={() => handleCheckout()}>{loading ? 'loading...' : order.paymentOption?.name}</button>
                        )}
                    </div>
                    <div className="border border-success rounded-3 bg-info bg-opacity-10 p-3" style={{ display: !showCard && 'none' }}>
                        <h4>Available Card</h4>
                        {cardDetails.length > 0 ? (
                            <>
                                {cardDetails.map(({authorization, _id}, idx) => (
                                    <div key={idx} className="d-flex justify-content-between align-items-center">
                                        <p>
                                            Pay with <span className="fw-bolder">{authorization.bank}</span> card ending in <span className="fw-bolder">{authorization.last4}</span> <br />
                                            Exp: {authorization.exp_month}/{authorization.exp_year}
                                        </p>
                                        <button className="btn btn-success text-white px-3 rounded-2" disabled={false} onClick={() => processPayment(_id)}>Sure!</button>
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="text-secondary">None of the above?</p>
                                    <PaystackButton className="btn btn-info text-white px-3 rounded-2" {...addCardBtnProps} onClick={() => setShowCard(false)} />
                                </div>
                            </>
                        ) : (
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="text-danger">
                                    No card available! Please add card to proceed with payments
                                </p>
                                <PaystackButton className="btn btn-info text-white px-3 rounded-2" {...addCardBtnProps} onClick={() => setShowCard(false)} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Payments