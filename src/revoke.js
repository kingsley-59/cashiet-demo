import axios from 'axios';
import { Outlet, Navigate } from 'react-router';
import httpService from './services/http-service';
import store from "./store/index";

export const useRevoke = async() => {
    // let token =localStorage.getItem('token');
    let revoke = false;

   await httpService
        .get('/users/user')
        .then((data) => {

            if (data.status) {
              if(data.data.user.isRevoked){
                revoke= true
            }

            }
        })
        .catch((error) => {
          revoke= false
        });
    
    return revoke;
}
const RevokedUser = () => {
    const isAuth = useRevoke();
    return isAuth ? <Outlet/>: <Navigate to='/user-revoked' /> ;
}

export default RevokedUser;