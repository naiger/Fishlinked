// @flow
import axios from "axios";

export function setEmail(email: string) {
	return {
		type: "SET_EMAIL",
		email,
	};
}
export function setPassword(password: string) {
	return {
		type: "SET_PASSWORD",
		password,
	};
}
export function setConfirmPassword(password: string) {
	return {
		type: "SET_CONFIRM_PASSWORD",
		password,
	};
}
export function emailValidate(bool: boolean,){
	return{
		type: "EMAIL_VALIDATE",
		bool,
	};
}
export function passwordValidate(bool: boolean,){
	return{
		type: "PASSWORD_VALIDATE",
		bool,
	};
}
export function confirmPasswordValidate(bool: boolean,){
	return{
		type: "CONFIRM_PASSWORD_VALIDATE",
		bool,
	};
}
export function registerSuccess(){
	return{
		type: "REGISTER_SUCCESS",
	}
}
export function registerError(error: Object){
	return{
		type: "REGISTER_ERROR",
		error,
	}
}
export function userIsRegistering(bool: boolean){
	return{
		type: "USER_IS_REGISTERING",
		isRegistering: bool,
	}
}
export function newUserRegister(email: string, password: string){
	const registerLink = "/wp-json/wp/v2/users/register";
	let userInfo = new Object;
	userInfo.username = email;
	userInfo.email = email;
	userInfo.password = password;
	return (dispatch: Function) => {
		dispatch(userIsRegistering(true));
		return axios.post(registerLink, userInfo)
		.then((response)=>{
			console.log(response.data);
			dispatch(registerSuccess());
			dispatch(userIsRegistering(false));
		})
		.catch((error)=>{
			console.log(error.response.data);
			dispatch(registerError(error.response.data.message));
			dispatch(userIsRegistering(false));
		})
	}
}
