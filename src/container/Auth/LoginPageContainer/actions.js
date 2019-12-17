// @flow
import axios from "axios";
import {fetchMyChannelsStatus, createTwilioUser} from '../../Message/actions';
import {MyProfileIsLoading} from '../../Member/MeStack/actions';

export function loginSuccess(nickname: string){
  return {
    type:"LOGIN_SUCCESS",
    nickname,
  };
}
export function loginError(error: Object) {
  return {
    type:"LOGIN_ERROR",
    error,
  };
}
export function userIsLoging(bool: boolean){
  return {
    type:"USER_IS_LOGING",
    bool,
  };
}
export function loginClick(bool: boolean){
  return{
    type:"LOGIN_CLICK",
    bool,
  };
}
export function fetchCurrentUserSuccess(user: Object){
  return{
    type:"FETCH_CURRENT_USER_SUCCESS",
    user,
  };
}
export function logout(){
  axios.defaults.headers.common["Authorization"] = "";
  return {
    type: "LOGOUT",
  };
}
//set axios global defaults
export function setGlobalAxiosDefault(token: string){
  AUTH_TOKEN = "Bearer " + token;
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  return (dispatch: Function) => {
    dispatch(fetchCurrentUser());
    //dispatch(validateUser());
  }
}
//validate user
// export function validateUser(){
//   console.log("validating");
//   const validateLink = "/wp-json/jwt-auth/v1/token/validate";
//   return axios.post(validateLink)
//   .then((response) => {
//     console.log("Valid User");
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// }
//get users
export function fetchCurrentUser(){
  return (dispatch: Function) => {
    const myLink = "/wp-json/wp/v2/users/me?context=edit";
    dispatch(MyProfileIsLoading(true));
    return axios.get(myLink)
    .then((response) => {
      dispatch(fetchCurrentUserSuccess(response.data));
      dispatch(createTwilioUser(response.data));
      dispatch(loginClick(false));
      dispatch(MyProfileIsLoading(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(MyProfileIsLoading(false));
    });
  };
}
//get token
export function login(values: Object){
    console.log(values);
		const loginLink = "/wp-json/jwt-auth/v1/token/";
		return (dispatch: Function) => {
			return axios.post(loginLink, values)
			.then((response)=>{
        console.log(response.data);
        dispatch(loginSuccess(response.data.user_display_name))
        dispatch(setGlobalAxiosDefault(response.data.token))
        dispatch(userIsLoging(false))
			})
			.catch((error)=>{
        dispatch(loginError(error))
        dispatch(loginClick(false));
        dispatch(userIsLoging(false))
			})
		}
}
