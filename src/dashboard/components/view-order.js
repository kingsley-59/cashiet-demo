import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpService from "../../services/http-service";
import toast from "react-hot-toast";
const SingleOrder = ()=>{
    let _id = useParams()
    let url= '/order/'+_id

    const [Loading, setLoading] = useState(false);
    const [ orders, setOrders ] = useState([]);
    const [viewOrder, setViewOder] = useState(false)
    
    const getOrders = async () => {
        
        try {
            const response = await httpService.get(url)
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
    useEffect(()=>{
        getOrders();
    })
return(
    <>
    <div>order page</div>
     </>
)
}
export default SingleOrder;