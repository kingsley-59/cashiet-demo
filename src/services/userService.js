
import httpService from "./http-service";

export default {
    getUser: async () => { 

        var user = {};

        try {
            const response = await httpService.get('/profile/user')
            if(response.status == 200){
                // console.log(response.data.userProfile)
            }
            return user;
        }
        catch(e){
            console.log(e)
        }
    }
}