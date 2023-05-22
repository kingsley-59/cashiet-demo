import Breadcrumb from "../views/layouts/breadcrumb";
import Addresses from "./components/address/adrresses";
import Info from "./components/info";
import Orders from "./components/orders/orders";
import Payments from "./components/payments";
import Profile from "./components/profile/profile";
import Security from "./components/security";
import Wishlist from "./components/wishlist/wishlist";
import {  useContext } from "react";
import { UserContext } from "../contexts/user-context";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Finanacial from "./components/financial";

const DashboardIndex = () => {
  const userContext = useContext(UserContext);

  const logout = () => {  
    localStorage.removeItem("_tt");
    localStorage.removeItem("xxrevxx");
    window.location.href = "/sign-in";
  };

  return (
    <>
      
        {/* breadcrumb start  */}
        <Breadcrumb title="Dashboard" breadcrumbItem="Dashboard" />
        {/* breadcrumb End  */}

        {/* dashboard section start  */}
        <section className="dashboard-section section-b-space user-dashboard-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="dashboard-sidebar">
                  { !userContext.loading && 
                    <div>
                      { userContext.user && 
                      <div className="profile-top">
                        <div className="profile-image">
                          <div className="skl-image">
                          
                              <img
                                src={
                                  userContext.user.profilePicture || "assets/images/profile-placeholder.jpg"
                                }
                                alt=""
                                className="img-fluid"
                                style={{ objectFit: "cover", height: "130px" }}
                              />
                            
                          </div>
                          
                        </div>
                        <div className="profile-detail">
                          <h5>
                            {userContext.user.firstName} {userContext.user.lastName}
                          </h5>
                          <h6>
                            {userContext.user.user
                              ? userContext.user.user.email
                              : ""}
                          </h6>
                        </div>
                      </div>
                      }
                      { !userContext.user && 
                      <div className="profile-top">
                        <div className="profile-image">
                          <div className="skl-image">
                              <img src="assets/images/profile-placeholder.jpg" alt="cashiet user profile" />
                          
                          </div>
                        </div>
                        <div className="profile-detail">
                          
                        </div>
                      </div>
                      }
                    </div>
                  }
                  <div>
                  {/* { userContext.loading && 
                  <div className="profile-top">
                    <div className="profile-image">
                      <div className="skl-image">
                          
                          <Skeleton width={130} height={130} circle={true}></Skeleton>
                      </div>
                    </div>
                    <div className="profile-detail">
                      
                    </div>
                  </div>
                  } */}
                  </div>
                  <div className="faq-tab">
                    <ul className="nav nav-tabs" id="top-tab" role="tablist">
                      <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#info"
                          className="nav-link active"
                        >
                          Account Info
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#address"
                          className="nav-link"
                        >
                          Address Book
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#orders"
                          className="nav-link"
                        >
                          My Orders
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#wishlist"
                          className="nav-link"
                        >
                          My Wishlist
                        </a>
                      </li>
                      {/* <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#payment"
                          className="nav-link"
                        >
                          My Banks
                        </a>
                      </li> */}
                      <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#profile"
                          className="nav-link"
                        >
                          Profile
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#security"
                          className="nav-link"
                        >
                          Identity Verification
                        </a>{" "}
                      </li>
                      <li className="nav-item">
                        <a
                          data-bs-toggle="tab"
                          data-bs-target="#financial"
                          className="nav-link"
                        >
                          Financial Verification
                        </a>{" "}
                      </li>
                      <li className="nav-item">
                        <a href="#" onClick={logout} className="nav-link">
                          Log Out
                        </a>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="faq-content tab-content" id="top-tabContent">
                  <div className="tab-pane fade show active" id="info">
                    <Info />
                  </div>
                  <div className="tab-pane fade" id="address">
                    <Addresses />
                  </div>
                  <div className="tab-pane fade" id="orders">
                    <Orders />
                  </div>
                  <div className="tab-pane fade" id="wishlist">
                    <Wishlist />
                  </div>
                  <div className="tab-pane fade" id="payment">
                    <Payments />
                  </div>
                  <div className="tab-pane fade" id="profile">
                    <Profile />
                  </div>
                  <div className="tab-pane fade" id="security">
                    <Security />
                  </div>
                  <div className="tab-pane fade full-hight" id="financial">
                    <Finanacial/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* dashboard section end */}
    
    </>
  );
};

export default DashboardIndex;
