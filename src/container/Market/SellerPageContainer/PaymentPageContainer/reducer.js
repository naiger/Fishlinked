const initialState = {
	adFee: 0,
	adPeriod: 0,
	paymentMethod: "",
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "INITIAL_AD_PACKAGE":{
			return {
				...state,
				adFee: action.adFee,
				adPeriod: action.adPeriod,
			};
			break;
		}
		case "SET_PAYMENT_METHOD":{
			return{
				...state,
				paymentMethod: action.method,
			};
		}
	}
	return state;
}
