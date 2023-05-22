import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";
import TransactionsItem from "./transactions-item";
import ViewTransaction from "./view-transaction";

const Transactions = () => {
    const [Loading, setLoading] = useState(false);
    const [ Transactions, setTransactions ] = useState([]);
    const [viewOrder, setViewOder] = useState(false)
    const getTransactions = async () => {
        
        try {
            const response = await httpService.get('/transactions/user/me')
            if (response.status === 200) {
                setLoading(false);

                setTransactions(response.data.allTransactions)
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
        getTransactions()
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card dashboard-table mt-0">
                        <div className="card-body table-responsive-sm">
                        
                       <TransactionsItem transactions={Transactions}/> 
                      
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transactions;