import './App.css';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useContext } from "react";
import { UserContext } from "./contexts/user-context";
import './assets/css/style.css'
import './assets/css/skeleton.css'
import './assets/css/owl.carousel.css'
import './assets/css/owl.theme.default.css'
import './assets/js/owl.js';
import { useDispatch } from 'react-redux'
import { cartActions } from './store/cartSlice'
import httpService from './services/http-service';
function App() {
  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  let isRevoked = false;
  const verifyAuth = async() => {
    let user = false;

   await httpService
        .get('/users/user')
        .then((data) => {
            if (data.status) {
                user = true
                if(data.data.user.isRevoked){
                  isRevoked = true;
                  // set user revoke to local storage
                  localStorage.removeItem('xxrevxx')
                  // remove user token  from local storage
                  localStorage.removeItem('_tt')
                  window.location.href = "/user-revoked";
                }else{
                  isRevoked = true;
                  // set user revoke to local storage
                  localStorage.setItem('xxrevxx', 'success')
                }

            }
        })
        .catch((error) => {
            user = false;
            var error_message = error.response.data.message;

        });
    }


  useEffect(() => {
    verifyAuth();
      userContext.getUser();
  }, [])
  useEffect(()=>{
    dispatch(cartActions.replaceCart())

  }, [])
 
  return (
    <div className="" style={{overflow: 'hidden'}}>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white',
              fontSize: 15,
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
              fontSize: 15,
            },
          },
        }}
      />
      <Outlet></Outlet>
    </div>
  );
}

export default App;
