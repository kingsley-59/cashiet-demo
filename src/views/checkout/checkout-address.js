import toast from "react-hot-toast";
import httpService from "../../services/http-service";
import React from "react";
import EditAddress from "../../dashboard/components/address/edit";
const CheckOutAddress = ({ orderAddr, handleInputChange, addresses, getAddresses, setAddress, setOrderAddr, address }) => {

    const deleteAddress = async (id) => {
        try {
            const response = await httpService.delete("/address/" + id);

            if (response.status === 200) {
                toast.success("Address deleted");
                getAddresses();
            }
        } catch (e) {
            toast.error("Oopps, network error");
        }
    };

    const closeModal = () => {
        window.$("#chkAddr").modal("hide");
    };
    return (<>
        <div className="row check-out">
            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                <div className="field-label">Phone</div>
                <input type="text" value={orderAddr.phoneNumber} onChange={handleInputChange} name="phoneNumber" placeholder="" />
            </div>
            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                <div className="field-label">Email </div>
                <input type="email" value={orderAddr.email} onChange={handleInputChange} name="email" placeholder="" />
            </div>
            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                <div className="field-label">City</div>
                <input type="text" name="city" onChange={handleInputChange} value={orderAddr.city} placeholder="" />
            </div>
            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                <label htmlFor="country" className="field-label">
                    Country
                </label>
                <select onChange={handleInputChange} name="country">
                    <option value={orderAddr.country}>{orderAddr.country}</option>
                    <option value="India">India</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United State">United State</option>
                    <option value="Australia">Australia</option>
                    <option value="Australia">Nigeria</option>
                </select>
            </div>
            <div className="form-group col-md-12 col-sm-6 col-xs-12">
                <div className="field-label">Zip Code</div>
                <input type="text" name="zip" onChange={handleInputChange} value={orderAddr.zip} placeholder="" />
            </div>
            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                <div className="field-label">Address 1</div>
                <textarea name="line1" onChange={handleInputChange} rows="5" cols="12" value={orderAddr.line1}></textarea>
            </div>
            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                <div className="field-label">Address 2</div>
                <textarea name="line2" onChange={handleInputChange} rows="5" cols="12" value={orderAddr.line2}></textarea>
            </div>
        </div>
        {/* Quick-view modal popup start*/}
        <div className="modal fade bd-example-modal-lg theme-modal" id="chkAddr" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content quick-view-modal">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="card-body" style={{ padding: "30px" }}>
                        <div className="top-sec">
                            <h3>Addresses</h3>
                        </div>
                        <div className="address-book-section">
                            <div className="checkout-page">
                                {addresses.map((address, key) => (
                                    <div key={key} className="chk-addr-wrap addr-pop mb-3">
                                        <div onClick={() => setOrderAddr({ ...addresses[key] })}>
                                            <input type="radio" name="address" value={key} className="addr-radio" />
                                        </div>
                                        <div className="d-flex justify-content-between ">
                                            <div>
                                                <h4>{address.email}</h4>
                                                <p className="mb-1">{address.line1}</p>
                                            </div>

                                            <div>
                                                <a
                                                    onClick={(e) => {
                                                        setAddress(address);
                                                        closeModal();
                                                    }}
                                                    href="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit-address"
                                                    title="Quick View"
                                                    className="edit-link d-block "
                                                >
                                                    <i className="fa fa-pencil d-inline-block pr-4"></i>
                                                    Edit
                                                </a>
                                                <a onClick={(e) => deleteAddress(address._id)} href="#" data-bs-toggle="modal" data-bs-target="#chkAddr" title="Quick View" className="edit-link d-block text-danger ">
                                                    <i className="fa fa-trash d-inline-block pr-4"></i>
                                                    Remove
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Quick-view modal popup start*/}
        <div className="modal fade bd-example-modal-lg theme-modal" id="edit-address" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content quick-view-modal">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="card-body" style={{ padding: "30px" }}>
                        <div className="top-sec">
                            <h3>Edit Address</h3>
                        </div>
                        <div className="address-book-section">
                            <div className="checkout-page">
                                <EditAddress address={address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Quick-view modal popup end*/}
    </>
    );
}

export default CheckOutAddress;