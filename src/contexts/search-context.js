import React, { useState } from "react";
import axios from 'axios';

export const UserContext = React.createContext({user:{}});


export default props =>{
    const [search, setSearch]= useState([]);

       const signin = async(data)=>{

            return  new Promise((resolve, reject) => {
                axios.post(process.env.REACT_APP_ENDPOINT + data.endpoint, data.details, {
                    headers: { Authorization: 'Bearer ' + process.env.REACT_APP_USER_TOKEN
                    }
                })
                .then((data)=>{
                   
                    resolve(data);
                })
                .catch((error)=>{
                    reject(error);
                })
            });
       }

    return (
        <UserContext.Provider value={{ user:userDetails, signin:signin}}>
            {props.children}
        </UserContext.Provider>
    )
}