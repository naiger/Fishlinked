// @flow
const initialState = {
	isSending: false,
	sendingResult: "",
	forgetEmailValid: true,
	forgetEmail: "",
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "FORGET_EMAIL_IS_SENDING":{
			if (action.isSending){
				return {
					...state,
					isSending: action.isSending,
					sendingResult: "",
				};
			}
			else {
				return {
					...state,
					isSending: action.isSending,
				};
			}
			break;
		}
		case "EMAIL_SENDING_RESULT":{
			return {
				...state,
				sendingResult: action.message,
			};
			break;
		}
		case "FORGET_EMAIL_VALIDATE": {
			return {
				...state,
				forgetEmailValid: action.bool,
			};
			break;
		}
		case "SET_FORGET_EMAIL": {
			return {
				...state,
				forgetEmail: action.email,
			};
			break;
		}
	}
	return state;
}
