import { useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import { countries } from 'country-list-json';
import PhoneInput from 'react-phone-number-input'

const CreateProfile = () => {
    
    const [Loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({ 
        firstName: "", middleName: "", lastName: "", phoneNumber: "", 
        gender: "", dob: "", nationality: '', profileImage: "", address: ""
    });
    const [ phone, setPhone] = useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }

    const ImageFile = (e) => {
        let file = e.target.files[0];

        if(file){
            setProfile((prevState) => ({
                ...prevState,
                profileImage: file
            }))
        }
    }


    const createProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        profile.phoneNumber = phone

        let formData = new FormData();

        for(var field in profile){
            formData.append(field, profile[field]);
        }

        
        try {
            const response = await httpService.post({ endpoint: '/profile', details: formData })
            if (response.status === 201) {
                setLoading(false);

                toast.success('Profile created successfully');
                
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            if(e.response.data.status == 500 ){
                toast.error('All fields are required!')
            }
            else{
                toast.error(e.response.data.message);
            }
        }
    };

    return (
        <>
            <div className="checkout-form">
                <form onSubmit={createProfile} encType = "Multipart/formData" >
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <div className="row check-out">
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">First Name</div>
                                    <input type="text" name="firstName" placeholder="" onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Middle Name</div>
                                    <input type="text" name="middleName" placeholder="" onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Last Name</div>
                                    <input type="text" name="lastName" placeholder="" onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Email Address</div>
                                    <input type="text" name="email" placeholder="" onChange={handleInputChange} required />
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
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Nationality</div>
                                    <select onChange={handleInputChange} name="nationality" >
                                        { countries && countries.map((country, key) => (
                                            <option key={key}  value={ country.name }>{ country.name }</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Date of Birth</div>
                                    <input className="date-input" type="date" name="dob" placeholder="" onChange={handleInputChange} required />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <div className="field-label">Profile Image</div>
                                    <input type="file" name="profileImage" placeholder="" onChange={(e) => ImageFile(e) } required />
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                <div className="field-label"></div>
                                    <div className="d-flex">
                                        <div className="radio-option paypal">
                                            <input type="radio" name="gender" value="male" id="male" onChange={handleInputChange} required />
                                            <label htmlFor="male" style={{color: '#333333', fontWeight: '700', marginLeft: '8px'}}>Male</label>
                                        </div>
                                        <div className="radio-option px-3 ">
                                            <input type="radio" name="gender" value="female" id="female" onChange={handleInputChange} required />
                                            <label htmlFor="female" style={{color: '#333333', fontWeight: '700', marginLeft: '8px'}} >Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label htmlFor="line1" className="field-label">Address</label>
                                    <textarea name="address" rows="5" cols="12" onChange={handleInputChange} required ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-sm btn-solid">
                        { !Loading && ' Create Profile'}
                        {  Loading && ' Loading...'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateProfile;