import { useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../../services/http-service";

const NewIdCard = () => {
    const [idCard, setIdCard] = useState({type:'', cardNumber:""});
    const [loading, setLoading] = useState(false)
    const handleInputChange = (e)=>{
        let {name, value} = e.target;
        setIdCard(prev =>({
            ...prev,
            [name]:value
        }))
    }
    const createIdCard =async(e)=>{
        setLoading(true);
        e.preventDefault();
        try {
            const response = await httpService.post({ endpoint: '/id-card', details: idCard })
            if (response.status === 201) {
                setLoading(false);

                toast.success('Id card created successfully');
                
                setIdCard({type:'', cardNumber:""})
            }
            else{
                throw response;
            }
        }
        catch (e) {
            setLoading(false)
            if(e.response.data.status == 500 ){
                toast.error('All fields are required!')
            }
            else{
                toast.error(e.response.data.message);
            }
        }
    }
    return (
        <form onSubmit={e => createIdCard(e)}>
            <div className="form-group">
                <label htmlFor="email">ID type</label>
                <select className="form-control w-50"  onChange={e => handleInputChange(e)} name="type">
                    <option>--select--</option>
                    <option value='nin'>Nin</option>
                    <option value='driverLicense'>DriverLicenes</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="email">Card number</label>
                <input type="text" v onChange={e => handleInputChange(e)} className="form-control w-50" placeholder="1234568" name ="cardNumber" required />
            </div>
            <button type="submit" className="btn btn-sm btn-solid">

                {loading ? 'Creating' : 'Create Id'}
            </button>
        </form>
    );
}

export default NewIdCard;