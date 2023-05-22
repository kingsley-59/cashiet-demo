import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/user-context";
import httpService from "../../services/http-service";
import Transactions from "./transactions/transactions";

const Info = () => {
  const [summary, setSummary] = useState({});
  const userContext = useContext(UserContext);
  const getproduct = () => {
    httpService
      .get("/summary")
      .then((data) => {
        setSummary(data.data)

      })
      .catch((error) => { });
  };
  useEffect(() => {
    getproduct()
  }, [])
  return (
    <>

      <div className="counter-section">
        <div className="welcome-msg">
          {userContext.user &&
            <h4>
              Hello,{" "}
              {userContext.user.user ? userContext.user.user.username : ""} !
            </h4>
          }

          <p>
            From your My Account Dashboard you have the ability to view a
            snapshot of your recent account activity and update your account
            information. Select a link below to view or edit information.
          </p>

        </div>
        <div className="row">
          <div className="col-md-4">

            <div className="counter-box">
              <img
                src="assets/images/shopping-bag.png"
                className="img-fluid"
                alt=""
              />
              <div>
                <h3>{summary?.orders?.total}</h3>
                <h5>Total Order</h5>
              </div>
            </div>

          </div>

          <div className="col-md-4">

            <div className="counter-box">
              <img
                src="assets/images/pending-order.png"
                className="img-fluid"
                alt=""
              />
              <div>
                <h3>{summary?.orders?.totalPendingOrders}</h3>
                <h5>Pending Orders</h5>
              </div>
            </div>

          </div>
          <div className="col-md-4">

            <div className="counter-box">
              <img
                src="assets/images/wishlist.png"
                className="img-fluid"
                alt=""
              />
              <div>
                <h3>{summary?.wishlist?.total}</h3>
                <h5>Wishlist</h5>
              </div>
            </div>

          </div>
        </div>
        <div className="box-account box-info">
          <div className="box-head">
            <h4>Transactions</h4>
          </div>
          <div className="row">
            <Transactions />
          </div>

        </div>
      </div>

    </>
  );
};

export default Info;
