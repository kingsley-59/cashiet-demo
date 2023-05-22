import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";

const SetupMandateModal = (props) => {
    const [ mandate, setMandate ] = useState( { bankCode: "", accountNumber: "", duration: 0, order: ""})
    const [Loading, setLoading] = useState(false);
    let activateMandate ={
        mandateId: props?.mandateDetails ? props?.mandateDetails?.mandateId : props?.mandateDetails?.mandateId,
        requestId: props?.mandateDetails ? props?.mandateDetails.requestId : '',
        order: props.orderId ? props.orderId: ''
    }
    const [ validateMandateDetails, setValidateMandateDetails ] = useState({
        mandateId: props.mandateDetails ? props.mandateDetails.mandateId : '',
        requestId: props.mandateDetails ? props.mandateDetails.requestId : '',
        order: props.orderId ? props.orderId: '',
        otp: "",
        cardNumber: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setMandate((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }
    const handleValidateMandateInputChange = (e) => {
        const { name, value } = e.target;
        
        setValidateMandateDetails((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }
    // (window).$('#edit-profile').modal('hide')
    const activateMandateOtp = async () => {
        setLoading(true);
       
        try {
            const response = await httpService.post({ endpoint: '/buy-later/activate-otp', details: activateMandate })
            if (response.status === 201) {
                setLoading(false);
                toast.success('Mandate successfully activated')
                var result = response.data.response;
                setValidateMandateDetails({
                    mandateId: result.mandateId,
                    requestId: result.requestId,
                    order: props.orderId,
                });
                (window).$('#validateMandateModal').modal('show')
                // window.location.reload()
              
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
            if(e.response.data.message === "Mandate already set up"){
                (window).$('#validateMandateModal').modal('show')

            }
        }
    };

    const validateMandate = async (e) => {
        e.preventDefault();
        setLoading(true);
       
        try {
            const response = await httpService.post({ endpoint: '/buy-later/validate-otp', details: validateMandateDetails })
            if (response.status) {
                setLoading(false);
                toast.success('Mandate Activated Successfully')
                toast.success('you recurring payment is now active')
                props.setMandateSuccess(true);
                (window).$('#validateMandateModal').modal('hide')
                var result = response.data.response;
                activateMandate = {
                    mandateId: result.mandateId,
                    requestId: result.requestId,
                    order: props.orderId
                }
               

            }
            else{
                toast.error(response.data.message, 'try again')

                throw response;
            }

        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
        }
    };
    const setUpMandate = async (e) => {
        e.preventDefault();
        setLoading(true);
        mandate.order = props.orderId
       
        try {
            const response = await httpService.post({ endpoint: '/buy-later/setup', details: mandate });
            if (response.status === 201) {
                setLoading(false);
                var result = response.data.response;
                activateMandate = {
                    mandateId: result.mandateId,
                    requestId: result.requestId,
                    order: props.orderId
                }
                activateMandateOtp();
                // (window).$('#setupMandateModal').modal('hide')



                toast.success('Mandate successfully created')

            }
            else{
             

                throw response;
            }
        }
        catch (e) {
          

            setLoading(false)
            let msg =e?.response?.data?.message

            if (msg == "Mandate already set up") {
                activateMandateOtp()
            }

            toast.error(msg);
            
        }
    };

   

    return (
       <> {props.mandateSuccess ==true  ? <><h2>congratulations!. Your recurring payment is now active you will get debited same date in the next 30 days</h2><a href="/dashboard">Go to dashboard to view details</a></>: 
       <>
            <div className="checkout-form">
                {props.mandateDetails && <>
                <p>Mandate already set. Click below to Activate your mandate to continue</p>
                    <button onClick={activateMandateOtp} className="btn btn-sm btn-solid mt-4">
                        { !Loading && ' Activate mandate'}
                        {  Loading && ' Loading...'}
                    </button>
                </>}
               {!props.mandateDetails  &&<form  onSubmit={e => setUpMandate(e)} > 
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <div className="row check-out">
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Your Account Number</div>
                                    <input type="text" name="accountNumber" placeholder=""  onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Your Bank Code</div>
                                    <input type="text" name="bankCode" placeholder=""  onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Payment Duration</div>
                                    <select onChange={handleInputChange} name="duration" >
                                        <option >--select duration for recurring payment --</option>
                                        <option value={2} >2 Months</option>
                                        <option value={3} >3 Months</option>
                                        <option value={4} >4 Months</option>
                                        <option value={5} >5 Months</option>
                                        <option value={6} >6 Months</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-sm btn-solid mt-4">
                        { !Loading && ' Setup'}
                        {  Loading && ' Loading...'}
                    </button>
                </form>}
            </div>
            {/* Activate Mandate modal popup start*/}
            <div className="modal fade bd-example-modal-lg theme-modal" id="validateMandateModal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content quick-view-modal">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <div className="card-body" style={{ padding: '30px' }} >
                            <div className="top-sec">
                                <h3>Validate Mandate</h3>
                            </div>
                            <div className="address-book-section">
                                <div className="checkout-page">
                                    <div className="checkout-form">
                                        <form  onSubmit={validateMandate} >
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12 col-xs-12">
                                                    <div className="row check-out">
                                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                            <div className="field-label">Your OTP</div>
                                                            <input type="text" name="otp" placeholder=""  onChange={handleValidateMandateInputChange} />
                                                        </div>
                                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                            <div className="field-label">Your Card Number</div>
                                                            <input type="text" name="cardNumber" placeholder="your card number"  onChange={handleValidateMandateInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-sm btn-solid mt-4">
                                                { !Loading && ' Proceed'}
                                                {  Loading && ' Loading...'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Activate Mandate modal popup end*/}
            </>
            
        }
        </>
    )
}

export default SetupMandateModal;