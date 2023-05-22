import Breadcrumb from "../layouts/breadcrumb";
import { useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../services/http-service";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [Loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await httpService.post({ endpoint: '/password', details: {email: email } })
            if (response.status === 200 ) {
                setLoading(false);
                toast.success('Password reset link sent to your email account');
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false);
            toast.error(e.response.data.message);
        }
    };


    return (
        <>
            {/* breadcrumb start */}
            <Breadcrumb title="Forgot Password" breadcrumbItem="Forgot Password" />
            {/* breadcrumb End */}


            {/*section start*/}
            <section className="pwd-page section-b-space">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                    <h2>Forget Your Password</h2>
                    <form onSubmit={sendEmail} className="theme-form">
                        <div className="form-row row">
                        <div className="col-md-12">
                            <input type="email" className="form-control" 
                            id="email" placeholder="Enter Your Email" 
                            required 
                            value={email} 
                            onChange={e =>  setEmail(e.target.value) }
                            />
                        </div><button type="submit" className="btn btn-solid w-auto">
                            {!Loading && 'Submit'}
                            {Loading && 'Loading...'}
                        </button>
                        <Link to={'/sign-in'} className="btn btn-solid w-auto">
                            back to login
                        </Link>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </section>
            {/*Section ends*/}
        </>
    )
}

export default ForgotPassword;