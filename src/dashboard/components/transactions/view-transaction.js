import Moment from "react-moment";

const ViewTransaction = ({ transaction }) => {
    return (
        <div>
            {transaction && <p> <Moment format="D MMM YYYY">{transaction.createdAt}</Moment></p>}
            <div className="row product-page-main card-body ">

                <div className="col-xl-12">
                    <div className=" float-end ">
                        <span>Status:</span>
                        {transaction?.invoice?.status === 'pending' ? <span className=" text-primary "> {transaction?.invoice?.status}</span>
                            : transaction?.invoice?.status === 'paid' ? <span className=" text-success "> {transaction?.invoice?.status}</span>
                                : transaction?.invoice?.status === 'cancelled' ? <span className=" text-danger "> {transaction?.invoice?.status}</span>
                                    : ''
                        }
                    </div>
                    <div className="product-page-details product-left mb-0 text-left align-baseline">
                        <div>
                            <h4 className="fw-bold">Invoice Details</h4>
                            <p>amount: {transaction?.invoice?.amount}</p>
                            <p>dateIssued: <Moment format="D MMM YYYY">{transaction?.invoice?.dateIssued}</Moment> </p>
                            <p>createdAt: <Moment format="D MMM YYYY"> {transaction?.invoice?.createdAt}</Moment></p>
                            <p>expiryDate: <Moment format="D MMM YYYY"> {transaction?.invoice?.expiryDate} </Moment></p>
                           
                            <hr />
                        </div>
                      


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTransaction;