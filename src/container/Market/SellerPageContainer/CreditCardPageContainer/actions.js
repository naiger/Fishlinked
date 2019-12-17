// @flow
import axios from "axios";

export function creditCardOnChange(formData: Object){
	return {
		type: "CREDIT_CARD_ONCHANGE",
		formData,
	};
}
export function addCreditCard(valid: boolean){
	return {
		type: "ADD_CREDIT_CARD",
		valid,
	};
}
export function CardTokenError( error: Object) {
	return {
		type: "CARD_TOKEN_ERROR",
		error,
	};
}
export function cardTokenIsGetting(bool: boolean){
	return {
		type: "CARD_TOKEN_IS_GETTING",
		isGetting: bool,
	};
}
export function saveCardToken(token: string){
	return {
		type: "SAVE_CARD_TOKEN",
		token,
	};
}
export function cleanCardToken(){
	return{
		type: "CLEAN_CARD_TOKEN",
	};
}

export function getTokenByCard(cardDetails: Object){
	//pk_live_vNzkqWjTCk4EVJ5MsbwFg9e8;
	PUBLISHABLE_KEY = "Bearer pk_live_vNzkqWjTCk4EVJ5MsbwFg9e8";
	const instance = axios.create({
		baseURL: "https://api.stripe.com/v1/tokens"
	});
	var formBody = [];
  for (var property in cardDetails) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(cardDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
	console.log(formBody);
	instance.defaults.headers.common['Authorization'] = PUBLISHABLE_KEY;
	return (dispatch: Function) => {
		dispatch(cardTokenIsGetting(true));
		return instance.post("", formBody, {
			headers:{
				'Cache-Control': 'no-cache',
				'Content-Type': 'application/x-www-form-urlencoded'
			}}).then(response => {
				console.log(response.data);
				dispatch(saveCardToken(response.data.id));
				dispatch(cardTokenIsGetting(false));
			}).catch(error => {
				console.log(error.response.data);
				dispatch(CardTokenError(error.response.data));
				dispatch(cardTokenIsGetting(false));
			});
	}
}
