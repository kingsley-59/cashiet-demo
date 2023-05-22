import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import { UserContext } from "../../../contexts/user-context";
import '../../../assets/css/style.css'
import { countries } from 'country-list-json';
import PhoneInput from 'react-phone-number-input'

const EditProfile = () => {
    
    const userContext = useContext(UserContext);
    const [user, setUser] = useState({ 
        firstName: "", middleName: "", lastName: "", phoneNumber: "", 
        gender: "", dob: "", nationality: '', profileImage: "", address: ""
    });
    const [ phone, setPhone] = useState('')
    const [Loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }


    const updateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        user.phoneNumber = phone
        try {
            const response = await httpService.put({ endpoint: '/profile', details: user })
            if (response.status === 200) {
                setLoading(false);
                userContext.getUser();
                toast.success('Profile created successfully');
                (window).$('#edit-profile').modal('hide')
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
        }
    };

    useEffect(() => {
        if(userContext.user != undefined) setUser(userContext.user); 
    }, [userContext.user])

    

    return (
        <>
            <div className="checkout-form">
                { userContext.userLoaded && 
                <form onSubmit={updateProfile} encType = "Multipart/formData" >
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <div className="row check-out">
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">First Name</div>
                                    <input type="text" name="firstName" placeholder="" value={user.firstName} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Middle Name</div>
                                    <input type="text" name="middleName" placeholder="" value={user.middleName} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Last Name</div>
                                    <input type="text" name="lastName" placeholder="" value={user.lastName} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Email Address</div>
                                    <input type="text" name="email" placeholder="" value={user.user? user.user.email : ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Phone</div>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        defaultCountry="NG"
                                        value={phone}
                                        onChange={setPhone}
                                    />
                                    {/* <input type="text" name="phoneNumber" placeholder="" value={user.phoneNumber} onChange={handleInputChange} /> */}
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Nationality</div>
                                    <select onChange={handleInputChange} name="nationality" >
                                        <option value={user.nationality}>{user.nationality}</option>
                                        { countries && countries.map((country, key) => (
                                            <option key={key}  value={ country.name }>{ country.name }</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Date of Birth</div>
                                    <input type="date" className="date-input" name="dob" placeholder=""   onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12 mt-4">
                                    <div className="field-label"></div>
                                    <div className="d-flex">
                                        <div className="radio-option paypal">
                                            <input type="radio" name="gender" checked={user.gender === 'female' ? true : false} value="male" id="male" onChange={handleInputChange} />
                                            <label htmlFor="male" style={{color: '#333333', fontWeight: '700', marginLeft: '8px'}}>Male</label>
                                        </div>
                                        <div className="radio-option px-3 ">
                                            <input type="radio" name="gender" checked={user.gender === 'female' ? true : false} value="female" id="female" onChange={handleInputChange} />
                                            <label htmlFor="female" style={{color: '#333333', fontWeight: '700', marginLeft: '8px'}} >Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                    <label htmlFor="line1" className="field-label mb-2">Address</label>
                                    <textarea name="address" rows="10" cols="12" onChange={handleInputChange} value={user.address} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-sm btn-solid mt-4">
                        { !Loading && ' Update'}
                        {  Loading && ' Loading...'}
                    </button>
                </form>
                }
            </div>
        </>
    )
}

export default EditProfile;