import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import OrdersItem from "./orders-item";

const Orders = () => {
    const [Loading, setLoading] = useState(false);
    const [ orders, setOrders ] = useState([]);
    const [viewOrder, setViewOder] = useState(false)
    
    const getOrders = async () => {
        
        try {
            const response = await httpService.get('/order/user')
            if (response.status == 200) {
                setLoading(false);

                setOrders(response.data.orders)
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            toast.error(e.response.data.message);
        }
    }

    useEffect(() => {
        getOrders()
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card dashboard-table mt-0">
                        <div className="card-body table-responsive-sm">
                        <div className="top-sec">
                            <h3>My Orders</h3>
                        </div>
                       <OrdersItem orders={orders}/> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders;