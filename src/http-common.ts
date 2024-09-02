import axios, {AxiosInstance} from "axios";
import secureLocalStorage from "react-secure-storage";


//const accessToken = sessionStorage.accessToken
const accessToken:string | any = secureLocalStorage.getItem("accessToken");
console.log("Secure storage ",accessToken)
const tenantId:string | any = secureLocalStorage.getItem("tenantId")



let http:AxiosInstance | any;

if(accessToken)
{
    http =  axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin':"*",
            'Authorization': "Bearer " + accessToken,
         }
    });

}
else {
    http =  axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin':"*",
        }
    });

}

export default http