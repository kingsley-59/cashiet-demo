import { useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../services/http-service";

const Subscribe = () => {

    const [Loading, setLoading] = useState(false);
    const [ subscribe, setSubscribe ] = useState({email: ''})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubscribe((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const addSubscriber = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await httpService.post({ endpoint: '/subscribers', details: subscribe })
            if (response.status == 201 ) {
                setLoading(false);
                setSubscribe((prevState) => ({
                    ...prevState,
                    ['email']: ' '
                }))
                toast.success('Successfully suscribed');

            }
            else{
                setSubscribe((prevState) => ({
                    ...prevState,
                    ['email']: 'hello'
                }))
                throw response;
            }
        }
        catch (e) {
            setSubscribe((prevState) => ({
                ...prevState,
                ['email']: ' '
            }))
            setLoading(false)
            toast.error(e.response.data.message);
        }
    };

    return (
        <>
            <form
                onSubmit={addSubscriber}
                className="form-inline subscribe-form auth-form needs-validation" method="post"
                id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank">
                <div className="form-group mx-sm-3">
                    <input type="email" className="form-control" name="email" id="mce-EMAIL"
                        placeholder="Enter your email" required onChange={handleInputChange} value={subscribe.email} />
                </div>
                <button type="submit" className="btn btn-solid" id="mc-submit">
                    { !Loading && 'subscribe'}
                    { Loading && 'Loading...'}
                </button>
            </form>
        </>
    )
}

export default Subscribe;