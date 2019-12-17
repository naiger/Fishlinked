const initialState = {
	paid: false,
	isProcessing: false,
	paymentErrorMessage: "",
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "PAYMENT_PROCESSING":{
			return {
				...state,
				isProcessing: action.isProcessing,
			};
			break;
		}
		case "PAYMENT_SUCCESS":{
			return {
				...state,
				paid: true,
				paymentErrorMessage: "",
			};
			break;
		}
		case "PAYMENT_FAILED":{
			return {
				...state,
				paid: false,
				paymentErrorMessage: action.message,
			};
			break;
		}
	}
	return state;
}
