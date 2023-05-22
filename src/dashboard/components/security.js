import NewIdCard from "./id/new-id-card";

const Security = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mt-0">
                        <div className="card-body">
                            <div className="dashboard-box">
                                <div className="dashboard-title">
                                    <h4>settings</h4>
                                </div>
                                <div className="dashboard-detail">
                                    <div className="account-setting">
                                        <h5>Create New ID Card</h5>
                                        <div className="row">
                                            <div className="col">
                                               <NewIdCard/>
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

export default Security;