import { useEffect, useState, } from "react";
import toast from 'react-hot-toast';
import httpService from "../services/http-service";
const useGetPaginate= (url)=>{
    const [data, setData] = useState();
    const [paginateData, setPaginateData] = useState();
    const { total,  } =paginateData ? paginateData : " ";
    const { page:current_page, limit:per_page }=paginateData?.users?.next ? paginateData?.users?.next : " ";
    const [Loading, setLoading] = useState(false)

    const getData = async (pageNumber) => {
        setLoading(true)
        try {
            const response = await httpService.get(url)
            if (response.status) {
                let result = response.data;
                setLoading(false)
                setPaginateData(result)
                setData(result)
            }
            setLoading(false)

        }
        catch (error) {
            setLoading(false)

            var error_message = error.response.data.message;
            toast.error(error_message);
        }

    }
    useEffect(()=>{
        getData(url)
    }, [url])
    return{ data, total, current_page, Loading, getData, per_page }
}
export default useGetPaginate;