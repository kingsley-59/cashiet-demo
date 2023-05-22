import { useState } from "react";
import Breadcrumb from "../layouts/breadcrumb";
import httpService from "../../services/http-service";
import { Link, useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"
import toast from 'react-hot-toast';

const SignUp = () => {
    const [password, setPassword] = useState("");
    const [created, setCreated] = useState(false);
    const [passwordIsValid, setpasswordIsValid] = useState(false);


    let navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [Loading, setLoading] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value.replace(/\s/g, ''),
        }))

    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!passwordIsValid) return;
        setLoading(true)
        try {
            const response = await httpService.post({ endpoint: '/users/signup', details: user })
            if (response.status) {
                setCreated(true)
                setLoading(false)
                toast.success('Registration successful, check your mail to verify your email')
                // navigate('/sign-in')
            }
            else {
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
        }
    }
    const resendEmail = async () => {
        setLoading(true);

        try {
            const response = await httpService.post({ endpoint: '/users/resendEmailToken', details: { email: user.email } })
            if (response.status) {
                setLoading(false);
                toast.success('A verification email has been sent to your mail');
            }
            else {
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
            {/* breadcrumb start  */}
            <Breadcrumb title="create account" breadcrumbItem="create account" />
            {/* breadcrumb End  */}


            {/* section start */}
            <section className="register-page section-b-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {!created &&
                                <><h3>create account</h3>
                                    <div className="theme-card">
                                        <form className="theme-form" onSubmit={handleSubmit}>
                                            <div className="form-row row">
                                                <div className="col-md-6">
                                                    <label htmlFor="review">Username</label>
                                                    <input type="text" className="form-control"
                                                        id="username" placeholder="Username"
                                                        required
                                                        name="username"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="email">email</label>
                                                    <input type="email" className="form-control" id="email"
                                                        placeholder="Email"
                                                        required
                                                        name="email"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row row">

                                                <div className="col-md-6">
                                                    <label htmlFor="review">Password</label>
                                                    <input type="password" className="form-control" id="review"
                                                        placeholder="Enter your password"
                                                        required
                                                        name="password"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                            </div>
                                            <PasswordChecklist
                                                rules={["minLength", "specialChar", "number", "capital"]}
                                                minLength={8}
                                                value={user.password}
                                                onChange={(value) => {
                                                    setpasswordIsValid(value)
                                                }}
                                                messages={{
                                                    minLength: "Password must be atleast 8",
                                                    specialChar: "Password must have special characters",
                                                    number: "Password must have a number",
                                                    capital: "Password must have a capital letter",
                                                }}
                                                invalid=''
                                            />
                                            <button type="submit" className="btn btn-solid w-auto mt-4">
                                                {!Loading && 'create Account'}
                                                {Loading && 'Loading...'}

                                            </button>

                                            <Link style={{ display: 'block', marginTop: '15px' }} to={'/sign-in'} className="text-success">Already have an account?</Link>

                                        </form>
                                    </div></>}
                            {created && <div className="row">
                                <div className="col-lg-2">
                                </div>
                                <div className="col-lg-8">
                                    <div className="theme-card">
                                        <div className="theme-form">
                                            <h4>An email verification link as been sent to your mail. please verify your email before you continue</h4>
                                            <div className="d-flex justify-center">
                                                <Link to="/sign-in" className="btn btn-solid w-auto mt-4 mx-2 text-sm-cashiet">continue</Link>
                                                <button onClick={resendEmail} className="btn btn-solid w-auto mt-4 text-sm-cashiet">{Loading ? 'sending...' : 'send again'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>}
                        </div>
                    </div>
                </div>
            </section>
            {/* Section ends */}
        </>
    )
}

export default SignUp;