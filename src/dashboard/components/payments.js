const Payments = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mt-0">
                        <div className="card-body">
                        <div className="top-sec">
                            <h3>Saved Cards</h3>
                            <a href="#" className="btn btn-sm btn-solid">+ add new</a>
                        </div>
                        <div className="address-book-section">
                            <div className="row g-4">
                            <div className="select-box active col-xl-4 col-md-6">
                                <div className="address-box">
                                <div className="bank-logo">
                                    <img src="../assets/images/bank-logo.png" className="bank-logo" />
                                    <img src="../assets/images/visa.png" className="network-logo" />
                                </div>
                                <div className="card-number">
                                    <h6>Card Number</h6>
                                    <h5>6262 6126 2112 1515</h5>
                                </div>
                                <div className="name-validity">
                                    <div className="left">
                                    <h6>name on card</h6>
                                    <h5>Mark Jecno</h5>
                                    </div>
                                    <div className="right">
                                    <h6>validity</h6>
                                    <h5>XX/XX</h5>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <a href="#" data-bs-target="#edit-address" data-bs-toggle="modal" className="bottom_btn">edit</a>
                                    <a href="#" className="bottom_btn">remove</a>
                                </div>
                                </div>
                            </div>
                            <div className="select-box col-xl-4 col-md-6">
                                <div className="address-box">
                                <div className="bank-logo">
                                    <img src="../assets/images/bank-logo1.png" className="bank-logo" />
                                    <img src="../assets/images/visa.png" className="network-logo" />
                                </div>
                                <div className="card-number">
                                    <h6>Card Number</h6>
                                    <h5>6262 6126 2112 1515</h5>
                                </div>
                                <div className="name-validity">
                                    <div className="left">
                                    <h6>name on card</h6>
                                    <h5>Mark Jecno</h5>
                                    </div>
                                    <div className="right">
                                    <h6>validity</h6>
                                    <h5>XX/XX</h5>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <a href="#" data-bs-target="#edit-address" data-bs-toggle="modal" className="bottom_btn">edit</a>
                                    <a href="#" className="bottom_btn">remove</a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payments;