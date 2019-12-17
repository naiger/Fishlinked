const initialState = {
	currency:"AUD",
	unit:"kg",
	price: 0,
	comments: "",
	priceValidation: undefined,
	commentsValidation: undefined,
	orderId: -1,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "PICK_CURRENCY":{
			console.log(action.currency);
			return {
				...state,
				currency: action.currency,
			};
			break;
		}
		case "PICK_UNIT":{
			console.log(action.unit);
			return {
				...state,
				unit: action.unit,
			};
			break;
		}
		case "UPDATE_PRODUCT_PRICE":{
			return {
				...state,
				price: action.price,
			};
			break;
		}
		case "UPDATE_PRODUCT_COMMENTS":{
			return {
				...state,
				comments: action.comments,
			};
			break;
		}
		case "PRICE_VALIDATE":{
			return {
				...state,
				priceValidation: action.number,
			};
			break;
		}
		case "COMMENTS_VALIDATE":{
			return {
				...state,
				commentsValidation: action.text,
			};
			break;
		}
		case "SAVE_ORDER_ID":{
			return {
				...state,
				orderId: action.id,
			};
			break;
		}
	}
	return state;
}
