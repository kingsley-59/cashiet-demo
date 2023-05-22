import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../contexts/user-context";
import CreateProfile from "./create";
import EditProfile from "./edit";
import httpService from "../../../services/http-service";
import toast from "react-hot-toast";
import Moment from 'react-moment';

const Profile = () => {
    const [showForm, setShowForm] = useState(false);
    const [password, setPassword] = useState({ newPassword: "" });
    const [Loading, setLoading] = useState(false)
    const userContext = useContext(UserContext)
   
    const setNewPassword = async (e) => {
        e.preventDefault()
   
        setLoading(true);

        try {
            const response = await httpService.put({ endpoint: '/password/update', details: password })
            if (response.status === 200) {
                setLoading(false);
                toast.success(response.data.message)

                window.location.href = '/dashboard'
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
   
    return (
        <>
            {!showForm &&
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-0">
                            <div className="card-body">
                                <div className="dashboard-box">
                                        <div className="dashboard-title">
                                        <h4>profile</h4>
                                            { userContext.user != null &&
                                                <span>
                                                    {userContext.user.length != 0 &&
                                                        <a
                                                            href="#" data-bs-toggle="modal"
                                                            data-bs-target="#edit-profile" title="Quick View" className="edit-link">Edit
                                                        </a>
                                                    }
                                                </span>
                                            }

                                            { userContext.user == null &&
                                                <a
                                                    onClick={(e) => setShowForm(true)}
                                                    href="#" title="Quick View" className="edit-link">
                                                    Add details
                                                </a>
                                            }
                                            
                                        </div>
                                    
                                    <div className="dashboard-detail">
                                        <ul>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>First name</h6>
                                                    </div>
                                                    <div className="right">
                                                        <h6>{userContext.user? userContext.user.firstName : ''}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Last name</h6>
                                                    </div>
                                                    <div className="right">
                                                        <h6>{userContext.user? userContext.user.lastName : ''}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Middle name</h6>
                                                    </div>
                                                    <div className="right">
                                                        <h6>{userContext.user? userContext.user.middleName : ''}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Email</h6>
                                                    </div>
                                                    <div className="right">
                                                        { userContext.user &&
                                                            <h6>{userContext.user.user ? userContext.user.user.email : ''}</h6>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Username</h6>
                                                    </div>
                                                    <div className="right">
                                                        { userContext.user &&
                                                            <h6>{userContext.user.user ? userContext.user.user.username : ''}</h6>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Gender</h6>
                                                    </div>
                                                    <div className="right">
                                                        <h6>{userContext.user ? userContext.user.gender : ''}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Nationality</h6>
                                                    </div>
                                                    <div className="right">
                                                        <h6>{userContext.user ? userContext.user.nationality : ''}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Phone number</h6>
                                                    </div>
                                                    <div className="right">
                                                        <h6>{userContext.user ? userContext.user.phoneNumber : ''}</h6>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="details">
                                                    <div className="left">
                                                        <h6>Date of birth</h6>
                                                    </div>
                                                    <div className="right">
                                                        <h6>
                                                            {userContext.user ? new Date(userContext.user.dob).toLocaleDateString() : ''}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div>
                                            <div className="dashboard-title mt-lg-5 mt-3">
                                                <h4>login details</h4>
                                                
                                            </div>
                                            <div className="dashboard-detail">
                                                <ul>
                                                    <form onSubmit={(e) => setNewPassword(e)}>
                                                        
                                                        <div className="form-group">
                                                            <label htmlFor="email">Set New Password</label>
                                                            <input type="text" value={password.newPassword} onChange={e => setPassword({ newPassword: e.target.value })} className="form-control w-50"  placeholder="*********" required />
                                                            </div>
                                                        <button type="submit" className="btn btn-sm btn-solid">

                                                            {Loading ? 'Setting...' : 'Set new Password'}
                                                        </button>
                                                    </form>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {/* Edit Profile modal popup start*/}
            <div className="modal fade bd-example-modal-lg theme-modal" id="edit-profile" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content quick-view-modal">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <div className="card-body" style={{ padding: '30px' }} >
                            <div className="top-sec">
                                <h3>Edit Profile</h3>
                            </div>
                            <div className="address-book-section">
                                <div className="checkout-page">
                                    <EditProfile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Profile modal popup end*/}

            {/* section start */}
            {showForm &&
                <div className="container">
                    <div className="checkout-page">
                        <a
                            onClick={(e) => setShowForm(false)}
                            href="#" title="Quick View" className="edit-link mb-3">
                            <i className="fa fa-angle-left"></i>  Back
                        </a>
                        <CreateProfile />
                    </div>
                </div>
            }
            {/* section end */}
        </>
    )
}

export default Profile;