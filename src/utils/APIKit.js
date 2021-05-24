import axios from 'axios';
import Config from './config';
import Errors from './Errors';
// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: Config.baseURL,
  timeout: 10000,
});

let handleerrors=(err)=>{
//if u want to add some toast here for errors you can add it here......
return {err_msg:Errors(err.response?err.response.status:""),status:0,err_code:err.response?err.response.status:""};
}
// # uncomment below one and set the default headers if you have
// APIKit.interceptors.request.use(function(config) {
// 	config.headers['Content-Type'] = `application/x-www-form-urlencoded`;
//     // config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });

// Set Cutomize Response
APIKit.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return {status:1,data:response.data}
  }, function (error) {
  		// console.log("handleerrors",error.response)
  		// handleerrors(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.resolve(handleerrors(error));
  });

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default APIKit;