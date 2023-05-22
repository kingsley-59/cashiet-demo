import Moment from "react-moment";

const OrdersItem = ({orders}) => {
    return (
        <div className="table-responsive-xl orders-wrap ">
        <table className="table cart-table order-table">
            <thead>
                <tr className="table-head">
                    <th scope="col">Order Date</th>
                    <th scope="col">Delivery Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Price</th>
                    <th scope="col">View</th>
                </tr>
            </thead>
            { orders  &&
                <tbody>
                    { orders.length > 0 && orders.map((order, key) => (
                        <tr key={key} >
                            <td>
                                <span className="mt-0"><Moment format="D MMM YYYY">{order.orderDate }</Moment></span>
                            </td>
                            <td>
                                <span className="fs-6"> <Moment toNow>{order.deliveryDate}</Moment></span>
                            </td>
                            <td>
                                <span className={  order.status === 'cancelled' ? "badge rounded-pill custom-badge bg-danger" : "badge rounded-pill bg-success custom-badge" }>{ order.status}</span>
                            </td>
                            <td>
                                <span className="theme-color fs-6">₦{ order.totalAmount }</span>
                            </td>
                            <td>
                                <a href={"/order/" + order._id}>
                                <i className="fa fa-eye text-theme" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            }
        </table>
        { orders && 
            <div>
                { orders.length === 0 && 
                    <div className=" no-items-wrap "  >
                        <p className="no-items-p">No orders available</p>
                    </div>
                }
            </div>
        }
    </div>
    );
}
 
export default OrdersItem;