import Breadcrumb from "../layouts/breadcrumb";
import { useState} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import httpService from "../../services/http-service";
import { useNavigate } from "react-router-dom";

const SignIn= () =>{

    let navigate = useNavigate();
 
    const [ User, setUser ] = useState({ email: "", password: ""});
    const [ Loading, setLoading ] = useState(false);
    const [ isVerified, setIsVerified ] = useState(true);
    const [email, setEmail] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value.replace(/\s/g, '')
        }))

    }

    const signin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await httpService.post({ endpoint: '/users/login', details: User })
            if (response.status) {
                setLoading(false);
                var user_token= response.data.token;
                localStorage.setItem('_tt', user_token);
                window.location.href = '/dashboard'
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            if(e.response.data.status === 400){
                setIsVerified(false)
            }
            else{
                toast.error(e.response.data.message);
            }
        }
    };

    const resendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await httpService.post({ endpoint: '/users/resendEmailToken', details: {email: User.email } })
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

    return (
        <>
            
            {/* breadcrumb start */}
            <Breadcrumb title="customer's login" breadcrumbItem="Login" />
            {/* breadcrumb End */}


            {/* section star */}
            <section className="login-page section-b-space">
                <div className="container">
                    <div className="row">
                        { isVerified &&
                            <div className="row" > 
                                <div className="col-lg-6">
                                    <h3>Login</h3>
                                    <div className="theme-card">
                                        <form className="theme-form" onSubmit={signin}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" className="form-control" id="email" placeholder="Email" name="email" required onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="review">Password</label>
                                                <input type="password" className="form-control" id="review"
                                                    placeholder="Enter your password" required name="password" onChange={handleInputChange}  />

                                                <Link style={{display:'inline-block'}} to={'/forgot-password'} className="text-success">Forgotten your Password?</Link>
                                            </div>
                                            
                                            <button type="submit"  className="btn btn-solid">
                                                {!Loading && 'Login'}
                                                {Loading && 'Loading...'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 right-login">
                                    <h3>New Customer</h3>
                                    <div className="theme-card authentication-right">
                                        <h6 className="title-font">Create An Account</h6>
                                        <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                                            able to order from our shop. To start shopping click register.</p><Link to={'/sign-up'}
                                            className="btn btn-solid">Create an Account</Link>
                                    </div>
                                </div>
                            </div>
                        }
                        { !isVerified && 
                            <div className="row">
                                <div className="col-lg-2">
                                </div>
                                <div className="col-lg-8">
                                    <h3>Resend Verification link</h3>
                                    <div>
                                        <p className="text-danger">You have not verified your email address 
                                            
                                        </p>
                                    </div>
                                    <div className="theme-card">                                    
                                        <form className="theme-form" onSubmit={resendEmail}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control" id="email" value={User.email? User.email : ''} placeholder="Email" required onChange={e =>  setEmail(e.target.value) } />
                                            </div>
                                            <button type="submit"  className="btn btn-solid" style={{marginRight: '10px', marginBottom: '10px'}}>
                                                {!Loading && 'Resend Verification link'}
                                                {Loading && 'Loading...'}
                                            </button>
                                            <button type="button" onClick={(e) => setIsVerified(true)}  className="btn btn-solid" style={{marginBottom: '10px'}}>
                                               Back to login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                </div>
                                {/* <div className="col-lg-6 right-login">
                                    <h3>New Customer</h3>
                                    <div className="theme-card authentication-right">
                                        <h6 className="title-font">Create An Account</h6>
                                        <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                                            able to order from our shop. To start shopping click register.</p><Link to={'/sign-up'}
                                            className="btn btn-solid">Create an Account</Link>
                                    </div>
                                </div> */}
                            </div>
                        }
                        
                    </div>
                </div>
            </section>
            {/* Section end */}
        </>
    )
}

export default SignIn;