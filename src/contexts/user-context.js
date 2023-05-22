import React, { useState } from "react";
import httpService from "../services/http-service";

export const UserContext = React.createContext({user:{}});


export default props =>{
    const [Loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    const [userRevoked, setUserRevoked] = useState(false)
    const [userLoaded, setUserLoaded] = useState(false);

        const getUser = async () =>{
            try {
                setLoading(true);
                const response = await httpService.get('/profile/user')
                if(response.status === 200){
                    
                    setLoading(false);
                    setUser(response.data.userProfile)
                    
                    setUserLoaded(true);
                   
                }
                else{
                    throw response;
                }
            }
            catch(e){
                setLoading(false);
            }
        }
       

    return (
        <UserContext.Provider value={{ user, getUser, Loading, userLoaded }}>
            {props.children}
        </UserContext.Provider>
    )
}