import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import $ from 'jquery';
import { countries } from 'country-list-json';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber } from 'react-phone-number-input'
import { useSelector, useDispatch } from "react-redux";
import { addressActions } from "../../../store/addressSlice";

const EditAddress = (props) => {
    const dispatch = useDispatch();
    const change = useSelector( state => state.address.change );
    const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", zip: "", country: "", phoneNumber: "", email: ""});
    const [Loading, setLoading] = useState(false);
    const [ phone, setPhone] = useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }

    const editAddress = async (e) => {
        e.preventDefault();
        setLoading(true);

        address.phoneNumber = phone
        
        try {
            const response = await httpService.put({ endpoint: '/address/'+address._id, details: address })
            if (response.status) {
                setLoading(false);
                setAddress(address)
                toast.success('Address updated successfully');
                dispatch(addressActions.isChanged());
                // window.location.reload()
                (window).$('#edit-address').modal('hide')
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
        if(props.address.email != undefined){
            setAddress({...props.address})
            var phoneNumb = '+'+props.address.phoneNumber.toString();
            setPhone(phoneNumb)
        }
    }, [props.address])

    
    return (
        <>
            <div className="checkout-page">
                <div className="checkout-form">
                    { address && 
                        <form onSubmit={editAddress}>
                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-xs-12">
                                    <div className="row check-out">
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <label htmlFor="country" className="field-label">Country</label>
                                            <select onChange={handleInputChange} name="country" >
                                                <option value={address.country} >{address.country}</option>
                                                { countries && countries.map((country, key) => (
                                                    <option key={key}  value={ country.name }>{ country.name }</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <label htmlFor="state" className="field-label">State</label>
                                            <input type="text" value={address.state} name="state" placeholder="" onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <label htmlFor="ciry" className="field-label">City</label>
                                            <input type="text" value={address.city} name="city" placeholder="" onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <label htmlFor="zip" className="field-label">Zip Code</label>
                                            <input type="text" value={address.zip} name="zip" placeholder="" onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <label htmlFor="email" className="field-label">Email Address</label>
                                            <input type="text" value={address.email} name="email" placeholder="" onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <label htmlFor="phone" className="field-label">Phone</label>
                                            <PhoneInput
                                                international
                                                countryCallingCodeEditable={false}
                                                defaultCountry="NG"
                                                value={phone}
                                                onChange={setPhone}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="line1" className="field-label">Address 1</label>
                                            <textarea name="line1" value={address.line1} rows="5" cols="12" onChange={handleInputChange} required ></textarea>
                                        </div>
                                        <div className="form-group mb-3 ">
                                            <label htmlFor="line2" className="field-label">Address 2</label>
                                            <textarea name="line2" value={address.line2} rows="5" cols="12" onChange={handleInputChange} required ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-sm btn-solid">
                                { !Loading && ' Update'}
                                {  Loading && ' Loading'}
                            </button>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default EditAddress;