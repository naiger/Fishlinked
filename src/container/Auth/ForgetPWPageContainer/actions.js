// @flow
import axios from "axios";

export function forgetEmailIsSending(bool: boolean) {
	return {
		type: "FORGET_EMAIL_IS_SENDING",
		isSending: bool,
	};
}
export function emailSendingResult(message: string) {
	return {
		type: "EMAIL_SENDING_RESULT",
		message,
	};
}
export function forgetEmailValidate(bool: string) {
	return {
		type: "FORGET_EMAIL_VALIDATE",
		bool,
	};
}
export function setForgetEmail(email: string){
	return {
		type: "SET_FORGET_EMAIL",
		email,
	};
}
export function sendForgetEmail(userInfo: string){
	const forgetLink = "/wp-json/wp/v2/users/lostpassword";
	let info = new Object;
	info.user_login = userInfo;
	return (dispatch: Function) => {
		dispatch(forgetEmailIsSending(true));
		return axios.post(forgetLink, info)
		.then((response)=>{
			console.log(response.data);
			dispatch(emailSendingResult(response.data.message));
			dispatch(forgetEmailIsSending(false));
		})
		.catch((error)=>{
			console.log(error.response.data);
			dispatch(emailSendingResult(error.response.data.message));
			dispatch(forgetEmailIsSending(false));
		})
	}
}
