import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import { countries } from 'country-list-json';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useSelector, useDispatch } from "react-redux";
import { addressActions } from "../../../store/addressSlice";

const CreateAddress = () => {
    const dispatch = useDispatch();
    const change = useSelector( state => state.address.change );
    const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", zip: "", country: "", phoneNumber: "", email: ""})
    const [Loading, setLoading] = useState(false)
    const [ phone, setPhone] = useState()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value
        }))

    }
    const createAddress = async (e) => {
        e.preventDefault();

        if (!phone) {
            toast.error('please input your phone number')
            return;
        }
        setLoading(true);
       
        address.phoneNumber = phone;


        try {
            const response = await httpService.post({ endpoint: '/address', details: address })
            if (response.status) {
                setLoading(false);

                toast.success('Address added successfully');
                dispatch(addressActions.isChanged());
                // window.location.reload()
                (window).$('#quick-view').modal('hide')
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

    // useEffect(() => {

    // }, [])

    return (
        <>
            <div className="checkout-page">
                <div className="checkout-form">
                    <form onSubmit={createAddress}>
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-xs-12">
                                <div className="row check-out">
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label htmlFor="email" className="field-label">Email Address</label>
                                        <input type="text" name="email" placeholder="" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label htmlFor="phone" className="field-label">Phone</label>
                                            <PhoneInput
                                                international
                                                countryCallingCodeEditable={false}
                                                defaultCountry="NG"
                                                value={phone}
                                                rules={{ required: true }}
                                                onChange={setPhone}
                                            />
                                        {/* <input type="text" name="phoneNumber" placeholder="" onChange={handleInputChange} /> */}
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <label htmlFor="line1" className="field-label">Address 1 </label>
                                        <input type="text" name="line1" placeholder="" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                        <label htmlFor="line2" className="field-label">Address 2</label>
                                        <input type="text" name="line2" placeholder="" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label htmlFor="ciry" className="field-label">City</label>
                                        <input type="text" name="city" placeholder="" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label htmlFor="state" className="field-label">State</label>
                                        <input type="text" name="state" placeholder="" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label htmlFor="zip" className="field-label">Zip Code</label>
                                        <input type="text" name="zip" placeholder="" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                        <label htmlFor="country" className="field-label mb-2 ">Country</label>
                                        <select onChange={handleInputChange} name="country" >
                                            { countries && countries.map((country, key) => (
                                                <option key={key}  value={ country.name }>{ country.name }</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-sm btn-solid">
                            { !Loading && ' Add Address'}
                            {  Loading && ' Loading'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateAddress;