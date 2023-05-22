import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import CreateAddress from "./create-address";
import EditAddress from "./edit";
import { addressActions } from "../../../store/addressSlice";
import { useSelector, useDispatch } from "react-redux";

const Addresses = () => {
    const dispatch = useDispatch();
    const addresses = useSelector( state => state.address.addresses );
    const change = useSelector( state => state.address.change );
    const [Loading, setLoading] = useState(false);
    const [ address, setAddress ] = useState({});

    const getAddresses = async () => {
        setLoading(true);
        
        try {
            const response = await httpService.get('/address/me')
            
            if(response.status === 200){ 
                dispatch(addressActions.UpdatedAddresses(response.data.addresses))
            }
            
        }
        catch (e) {
            // toast.error("Oopps, Network unavailable!");
            setLoading(false);
        }
    }

    const deleteAddress = async (id) => {
        
        setLoading(true);
        
        try {
            const response = await httpService.delete('/address/'+id)
            
            if(response.status === 200){ 
                toast.success("Address deleted")
                getAddresses();
            }
            
        }
        catch (e) {
            toast.error("Oopps, Network unavailable!");
            setLoading(false);
        }
    }

    useEffect(() => {
        getAddresses();
    }, [change])


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mt-0">
                        <div className="card-body">
                            <div className="top-sec">
                                <h3>Address Book</h3>
                                <a
                                    href="#" data-bs-toggle="modal"
                                    data-bs-target="#quick-view" title="Quick View" className="btn btn-sm btn-solid">+ add new
                                </a> 
                            </div>
                            <div className="address-book-section">
                                <div className="row g-4">
                                    { addresses.length > 0 && addresses.map((address, key) =>(
                                        <div key={key} className="select-box active col-xl-4 col-md-6">
                                            <div className="address-box">
                                            <div className="top">
                                                <h6>{address.email} </h6>
                                            </div>
                                            <div className="middle">
                                                <div className="address">
                                                <p>{address.line1}</p>
                                                <p></p>
                                                <p>{ address.line2 }</p>
                                                </div>
                                                <div className="number">
                                                <p>mobile: <span>+{address.phoneNumber}</span></p>
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <a href="#" onClick={(e) => setAddress({...address}) } data-bs-target="#edit-address" data-bs-toggle="modal" className="bottom_btn">edit</a>
                                                <a href="#" className="bottom_btn" onClick={(e) => deleteAddress(address._id)} >remove</a>
                                            </div>
                                            </div>
                                        </div>
                                    ))}

                                    { addresses.length === 0 && 
                                        <div className=" no-items-wrap "  >
                                            <p className="no-items-p">You haven't added any address</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick-view modal popup start*/}
                    <div className="modal fade bd-example-modal-lg theme-modal" id="quick-view" tabIndex={-1} role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="card-body" style={{padding: '30px'}} >
                                    <div className="top-sec">
                                        <h3>Create Address</h3>
                                    </div>
                                    <div className="address-book-section">
                                        <div className="checkout-page">
                                            <CreateAddress/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Quick-view modal popup end*/}

                    {/* Quick-view modal popup start*/}
                    <div className="modal fade bd-example-modal-lg theme-modal" id="edit-address" tabIndex={-1} role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="card-body" style={{padding: '30px'}} >
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
                </div>
            </div>
        </>
    )
}

export default Addresses;