import { useEffect, useState } from "react";
import Breadcrumb from "../layouts/breadcrumb";
import httpService from "../../services/http-service";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"
import toast from 'react-hot-toast';
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    // http://cashiet.com/password-reset?user=62bf322dc3757a3c6197225f&token=f456799bbbd4eb70f40af6b249267a3677ff7858b183ebacfd3a7590b5d0b62b
    const [passwordIsValid, setpasswordIsValid] = useState(false);
    const [searchParams, setSearchParams]= useSearchParams();
    const token = searchParams.get('token');
    const user_id = searchParams.get('user')


    let navigate = useNavigate();
    const [user, setUser] = useState({
        userId: user_id,
        token: token,
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
    const resetPassword = async (e) => {
        e.preventDefault()
       
        if(!passwordIsValid) return;
        
        setLoading(true)
        try {
            const response = await httpService.post({ endpoint: '/password/reset', details: user })
            if (response.status) {
                setLoading(false)
                toast.success('Password changed successfully')
                navigate('/sign-in')
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
            // ""
        }
    }


    return (
        <>
            {/* breadcrumb start  */}
            <Breadcrumb title="Reset Password" breadcrumbItem="Reset Password" />
            {/* breadcrumb End  */}

            {/*section start*/}
            <section className="pwd-page section-b-space">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                    <h2>Reset Password</h2>
                    <form onSubmit={resetPassword} className="theme-form">
                        <div className="form-row row">
                        <div className="col-md-12">
                        <input type="password" className="form-control" id="review"
                            placeholder="Enter your password" 
                            required
                            name="password"
                            onChange={handleInputChange}
                        />
                        </div>
                        <PasswordChecklist
                            rules={["minLength","specialChar","number","capital"]}
                            minLength={8}
                            value={user.password}
                            onChange={(value)=>{
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
                        <button type="submit" className="btn btn-solid w-auto m-3">
                            {!Loading && 'Change Password'}
                            {Loading && 'Loading...'}
                        </button>
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

export default ResetPassword;