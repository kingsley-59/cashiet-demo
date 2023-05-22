import axios from "axios";

let token = localStorage.getItem('_tt');

const httpService =  {

    state: {
        endpoint: process.env.REACT_APP_ENDPOINT,
        // endpoint: 'http://localhost:5000/api/v1',
        user: null,
        token: token
    }, 
    post(data){
        return  new Promise((resolve, reject) => {
            axios.post(this.state.endpoint + data.endpoint, data.details, {
                headers: { Authorization: 'Bearer ' + token,
                }
            })
            .then((data)=>{
                resolve(data);
            })
            .catch((error)=>{
                // context.dispatch('handleError', error);
                reject(error);
            })
        });
    },
    put(data){
        return  new Promise((resolve, reject) => {
            axios.put(this.state.endpoint + data.endpoint, data.details, {
                headers: { Authorization: 'Bearer ' + token,
                }
            })
            .then((data)=>{
                resolve(data);
            })
            .catch((error)=>{
                // context.dispatch('handleError', error);
                reject(error);
            })
        });
    },
    delete(url){
        return  new Promise((resolve, reject) => {
            axios.delete(this.state.endpoint + url, {
                headers: { Authorization: 'Bearer ' + token,
                }
            })
            .then((data)=>{
                resolve(data);
            })
            .catch((error)=>{
                reject(error);
            })
        });
    },
    get(url){

        return new Promise((resolve, reject) => {
            axios.get(this.state.endpoint + url, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((data)=>{
                resolve(data);
            })
            .catch((error)=>{
                reject(error);
            })
        });
    },

}

export default httpService;