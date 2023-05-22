import httpService from "../../services/http-service";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import OkraW from "./okra/okra";
import { PaystackButton } from "react-paystack";
import { useCallback } from "react";

const paystackKey = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PAYSTACK_TEST_KEY : process.env.REACT_APP_PAYSTACK_LIVE_KEY

const Finanacial = () => {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    
    const addCardBtnProps = useMemo(() => {
        return {
            email: email,
            amount: 50 * 100,
            channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
            metadata: {
                name: name,
                phone: phone,
            },
            publicKey: paystackKey,
            text: "Add Card",
            onSuccess: function (response) {
                console.log(response)
                const { reference, status: txnStatus, message } = response
                if (txnStatus !== 'success') { toast.error(message); return; }

                async function verifyTransaction() {
                    const toastId = toast.loading('Verifying transaciton...')
                    try {
                        const { status, data } = await httpService.get(`/payments/verify/${reference}`)
                        if (status === 200) {
                            toast.success(data.message, { id: toastId })
                            setCards(data.data)
                        } else throw new Error(data.message)
                    } catch (error) {
                        console.log(error)
                        toast.error(error?.response?.data?.message ?? error.message, { id: toastId })
                    }
                }

                verifyTransaction()
            },
            onClose: () => {
                setLoading(false)
            },
        }
    }, [email, name, phone])

    const removeCard = useCallback(async (_id) => {
        console.log(_id)
        try {
            const { data } = await httpService.delete(`/payments/remove-card/${_id}`)
            toast.success(data.message)
            setCards(prev => prev.filter(card => card._id !== _id))
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error.message)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Submitted.')
    }

    useEffect(() => {
        async function fetchCards() {
            setLoading(true)
            try {
                const { data } = await httpService.get('/payments/user')
                setCards(data?.data)
                setLoading(false)
            } catch (error) {
                toast.error(error?.response?.data?.message ?? error.message)
                setLoading(false)
            }
        }
        fetchCards()
    }, [])


    return (
        <section className="d-flex flex-column gap-3">
            {/* <OkraW/> */}

            <div className="h3">Manage Cards</div>
            <div className="text-center d-grid gap-3">
                <p className="m-auto text-justify" style={{maxWidth: '600px'}}>
                    Click the button below to add debit cards for future transactions.
                    Please note that we do not save your card details in our database and all transactions are carried out through a payment gateway.
                    You can read more about out <a href="/privacy-policy">Privacy policy</a> and <a href="/terms-of-service">Terms of service.</a>
                </p>
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className="row mb-3 mx-auto" style={{maxWidth: '800px'}}>
                            <div className="col-12 text-start">
                                <span className="text-small text-danger">All fields are required!</span>
                            </div>
                            <div className="col-6 p-2">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded-3" placeholder="card name e.g John Doe" required/>
                            </div>
                            <div className="col-6 p-2">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control rounded-3" placeholder="card email" required/>
                            </div>
                            <div className="col-6 p-2">
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control rounded-3" placeholder="phone number" required/>
                            </div>
                            <div className="col-6 p-2 text-end">
                                <PaystackButton className="btn btn-info px-3 rounded-3" {...addCardBtnProps} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-100 text-center">
                <hr className="w-50 mx-auto" />
            </div>
            <div className="p-4 border table-responsive" style={{borderRadius: '20px'}}>
                <table className="table table-responsive">
                    <thead>
                        <tr className="text-center">
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Bank</th>
                            <th>Brand</th>
                            <th>Last4</th>
                            <th>Exp.</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.length === 0 && !loading && (
                            <tr>
                                <td colSpan={6}>No cards available</td>
                            </tr>
                        )}
                        {loading && (
                            <tr>
                                <td colSpan={6} className="text-center">Loading...</td>
                            </tr>
                        )}
                        {!loading && cards.map(({authorization, customer, _id}, idx) => (
                            <tr key={idx} className="text-center">
                                <td>{idx + 1}</td>
                                <td>{authorization?.account_name ?? '[no name]'}</td>
                                <td>{customer?.email ?? '[no email]'}</td>
                                <td>{authorization?.bank}</td>
                                <td>{authorization?.brand}</td>
                                <td>{authorization.last4}</td>
                                <td>{authorization.exp_month}/{authorization.exp_year}</td>
                                <td>
                                    <button className="btn btn-danger text-white rounded-2" onClick={() => removeCard(_id)}>
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Finanacial;