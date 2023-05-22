// import toast from "react-hot-toast";
// import httpService from "./http-service";
// import { addressActions } from "../store/addressSlice";

// export default {
//     getAddresses: async () => {
        
        
//         try {
//             const response = await httpService.get('/address/me')
            
//             if(response.status === 200){ 
//                 dispatch(addressActions.UpdatedAddresses(response.data.addresses))
//             }
            
//         }
//         catch (e) {
//             console.log(e)
//             // toast.error("Oopps, network error");
//             // setLoading(false);
//         }
//     },
// }