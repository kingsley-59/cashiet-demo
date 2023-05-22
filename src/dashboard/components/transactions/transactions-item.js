import { useState } from "react";
import Moment from "react-moment";
import ViewTransaction from "./view-transaction";

const TransactionsItem = ({ transactions }) => {
    const [transaction, setTransaction] = useState({})
    return (


        <div className="table-responsive-xl order-wrap ">
            <table className="table cart-table order-table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Transaction Date</th>
                        {/* <th scope="col">Status</th> */}
                        <th scope="col">Price</th>
                        <th scope="col">View</th>
                    </tr>
                </thead>
                {transactions &&
                    <tbody>
                        {transactions.length > 0 && transactions.map((transaction, key) => (
                            <tr key={key} >
                                <td>
                                    <span className="mt-0"><Moment format="D MMM YYYY">{transaction.transactionDate}</Moment></span>
                                </td>
                                {/* {transaction?.responseData && <td>
                                    <span className={transaction?.responseData?.paymentState === "SUCCESSFUL" ? "badge rounded-pill bg-success custom-badge" : "badge rounded-pill custom-badge bg-danger"}>{transaction?.responseData?.paymentState}</span>
                                </td>} */}

                                {/* {transaction?.isRecurring && <td>
                                    <span className={transaction?.isRecurring ? "badge rounded-pill bg-success custom-badge" : "badge rounded-pill custom-badge bg-danger"}>RecurringPayment</span>
                                </td>} */}
                                <td>
                                    <span className="badge rounded-pill bg-success custom-badge">{transaction?.isRecurring ? 'Recurring Payment' : 'One-time Payment'}</span>
                                </td>

                                <td>
                                    <span className="theme-color fs-6">₦{transaction.invoice.amount}</span>
                                </td>
                                <td>
                                    <i onClick={() => setTransaction(transaction)} className="fa fa-eye text-theme" data-bs-target="#view-transaction" data-bs-toggle="modal" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </table>
            <div className="modal fade bd-example-modal-lg theme-modal" id="view-transaction" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content quick-view-modal">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <div className="card-body" style={{ padding: '30px' }} >
                            <div className="top-sec">
                                <h3>View Order</h3>
                            </div>
                            <div className="address-book-section">
                                <div className="checkout-page">
                                    <ViewTransaction transaction={transaction} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {transactions &&
                <div>
                    {transactions.length === 0 &&
                        <div className=" no-items-wrap "  >
                            <p className="no-items-p">No transactions available</p>
                        </div>
                    }
                </div>
            }


        </div>
    );;
}

export default TransactionsItem;