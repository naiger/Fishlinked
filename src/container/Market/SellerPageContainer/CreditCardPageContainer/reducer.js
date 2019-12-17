const initialState = {
	formData: {"valid":false},
	creditCard: {},
	cardToken: "",
	isGetting: false,
	cardError: null,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "CREDIT_CARD_ONCHANGE":{
			return {
				...state,
				formData: action.formData,
				cardToken: "",
				cardError: null,
			};
			break;
		}
		case "ADD_CREDIT_CARD":{
			console.log(state.creditCard);
			if (action.valid){
				return {
					...state,
					creditCard: state.formData.values,
				};
			}
			break;
		}
		case "SAVE_CARD_TOKEN":{
			return {
				...state,
				cardToken: action.token,
			};
			break;
		}
		case "CARD_TOKEN_IS_GETTING":{
			return {
				...state,
				isGetting: action.isGetting,
			};
			break;
		}
		case "CARD_TOKEN_ERROR":{
			return {
				...state,
				cardError: action.error,
			};
			break;
		}
		case "CLEAN_CARD_TOKEN":{
			return {
				...state,
				cardToken: "",
			};
			break;
		}
	}
	return state;
}
