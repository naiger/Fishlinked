const initialState = {
	userIsValid: false,
	loginError: null,
	loginClicked: false,
	isLoging: true,
	nickname: "",
	currentUser: null,
	isUserInfoLoading: true,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "LOGIN_CLICK":{
			if (action.bool == true){
				return {
					...state,
					loginClicked: action.bool,
					loginError: null,
				};
			}
			else return {
				...state,
				loginClicked: action.bool,
			};
			break;

		}
		case "LOGIN_ERROR":{
			return {
				...state,
				loginError: action.error,
			};
			break;
		}
		case "LOGIN_SUCCESS":{
			return {
				...state,
				nickname: action.nickname,
				userIsValid: true,
			};
			break;
		}
		case "LOGOUT":{
			return {
				...state,
				userIsValid: false,
				loginError: null,
				loginClicked: false,
				isLoging: true,
				nickname: "",
				currentUser: null,
				isUserInfoLoading: true,
			};
			break;
		}
		case "USER_IS_LOGING":{
			return {
				...state,
				isLoging: action.bool,
			}
			break;
		}
		case "FETCH_CURRENT_USER_SUCCESS":{
			return {
				...state,
				currentUser: action.user,
				isUserInfoLoading: false,
			};
			break;
		}
	}
	return state;
}
