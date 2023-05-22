
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import httpService from "../../services/http-service";

const VerifyEmail = () => {

    
    const [verified, setVerified ] = useState(false);
    const [alreadyVerified, setAlreadyVerified ] = useState(false);
    const [notVerified, setNotVerified ] = useState(false);
    let { emailToken } = useParams();
    const [email, setEmail] = useState('');
    const [Loading, setLoading] = useState(false);

    const resendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await httpService.post({ endpoint: '/users/resendEmailToken', details: {email: email } })
            if (response.status) {
                setLoading(false);
                toast.success('A verification email has been sent to your mail');
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

    const confirmEmail = async () => {
        
        try {
            const response = await httpService.get( '/users/confirm/'+emailToken)
            if (response.status) {
                setVerified(true);
                alert('hdhdh')
            }
            else{
                throw response;
            }
        }
        catch (e) {
            if(e.response.data.type === 'already-verified'){
                setAlreadyVerified(true);
            }
            if( e.response.data.type === 'not-verified'){
                toast.error('Token expired, please re-send Email')
                setNotVerified(true);
            }
            
        }
    }

    useEffect(() => {
        confirmEmail();
    }, [])
    
    
    return (
        <>
            {/* section star */}
            <section className="login-page section-b-space">
                <div className="container">
                    <div className="row">
                        {
                           notVerified &&
                            <div className="col-lg-12">
                                <h3>Resend Email</h3>
                                <div className="theme-card " style={{height: '400px'}}>
                                    <form onSubmit={resendEmail} className="theme-form verfied-form" style={{width: '400px', margin: 'auto'}}>
                                        
                                        <div className="form-group pt-5">
                                            
                                            <label for="email">Email</label>
                                            <input type="email" 
                                                className="form-control" id="email" 
                                                placeholder="Email" required 
                                                onChange={e =>  setEmail(e.target.value) }
                                                value={email}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-solid " style={{width: '100%'}} >
                                            {!Loading && 'Login'}
                                            {Loading && 'Loading'}
                                        </button>
                                    </form>
                                </div>
                        </div>
                        }
                        { verified && 
                            <div  className="col-lg-12 right-login" style={{height: '400px'}}>
                            
                                <div className="theme-card authentication-right text-center pt-5 " >
                                    <i className="fa fa-check text-success font-bold text-lg" style={{fontSize: '80px'}} aria-hidden="true"></i>
                                    <h6 className="title-font">Your Email has been verified</h6>
                                    <Link to={'/sign-in'} className="btn btn-solid">Login</Link>
                                </div>
                            </div>
                        }
                        { alreadyVerified && 
                            <div  className="col-lg-12 right-login" style={{height: '400px'}}>
                            
                                <div className="theme-card authentication-right text-center pt-5 " >
                                    <i className="fa fa-check text-success font-bold text-lg" style={{fontSize: '80px'}} aria-hidden="true"></i>
                                    <h6 className="title-font">Your Email has already been verified</h6>
                                    <Link to={'/sign-in'} className="btn btn-solid">Login</Link>
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
            </section>
            {/* Section end */}
        </>
    )
}

export default VerifyEmail;