import React, { useEffect, useState } from "react";
import httpService from "../services/http-service";

export const CategoryContext = React.createContext({category:{}});


export default props =>{
    const [Loading, setLoading] = useState(false);
    const [category, setcategory] = useState([])
    const [categoryLoaded, setcategoryLoaded] = useState(false);
        const getcategory = async () =>{
            try {
                setLoading(true);
                const response = await httpService.get('/categories');
                if(response.status === 200){
                    setLoading(false);
                    
                    setcategory(response.data.categories)
                    setcategoryLoaded(true);
                    
                }
                else{
                    throw response;
                }
            }
            catch(e){
                setLoading(false);
            }
        }
        useEffect(()=>{
            getcategory()
        }, []);
    return (
        <CategoryContext.Provider value={{ category, getcategory, Loading, categoryLoaded }}>
            {props.children}
        </CategoryContext.Provider>
    )
}