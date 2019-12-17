// @flow
const initialState = {
	registerEmail: "",
	registerPW: "",
	confirmPW: "",
	emailValid: true,
	PWValid: true,
	confirmPWValid: true,
	isRegistering: false,
	isRegistered: false,
	registerErrorMessage: "",
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "SET_EMAIL":{
			return {
				...state,
				registerEmail: action.email,
			};
			break;
		}
		case "SET_PASSWORD":{
			return {
				...state,
				registerPW: action.password,
			};
			break;
		}
		case "SET_CONFIRM_PASSWORD":{
			return {
				...state,
				confirmPW: action.password,
			};
			break;
		}
		case "EMAIL_VALIDATE":{
			return {
				...state,
				emailValid: action.bool,
			};
			break;
		}
		case "PASSWORD_VALIDATE":{
			return {
				...state,
				PWValid: action.bool,
			};
			break;
		}
		case "CONFIRM_PASSWORD_VALIDATE": {
			return {
				...state,
				confirmPWValid: action.bool,
			};
			break;
		}
		case "REGISTER_SUCCESS": {
			return {
				...state,
				isRegistered: true,
				registerErrorMessage: null,
			};
			break;
		}
		case "REGISTER_ERROR": {
			return {
				...state,
				isRegistered: false,
				registerErrorMessage: action.error,
			};
			break;
		}
		case "USER_IS_REGISTERING": {
			return {
				...state,
				isRegistering: action.isRegistering,
			};
			break;
		}
	}
	return state;
}
