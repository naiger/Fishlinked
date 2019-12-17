// @flow
import axios from "axios";

export function pickCurrency(currency: string) {
	return {
		type: "PICK_CURRENCY",
		currency,
	};
}
export function pickUnit(unit: string) {
	return {
		type: "PICK_UNIT",
		unit,
	};
}
export function updateProductPrice(price: number) {
	return {
		type: "UPDATE_PRODUCT_PRICE",
		price,
	};
}
export function updateProductComments(comments: string){
	return {
		type: "UPDATE_PRODUCT_COMMENTS",
		comments,
	};
}
export function priceValidate(number: string) {
	return {
		type:"PRICE_VALIDATE",
		number,
	}
}
export function commentsValidate(text: string) {
	return {
		type:"COMMENTS_VALIDATE",
		text,
	}
}
export function saveOrderId(id : number){
	return {
		type:"SAVE_ORDER_ID",
		id,
	}
}

export function createOrder(productId: number){
	const line_items = new Object;
	line_items.product_id = productId;
	line_items.quantity = 1;
	const data = new Object;
	data.payment_method = "stripe";
	data.payment_method_title = "Stripe";
	data.line_items = [line_items];
	console.log(data);
	const orderLink = "/wp-json/wc/v2/orders";
	return (dispatch: Function) => {
		return axios.post(orderLink, data)
		.then((response)=>{
			console.log(response.data)
			dispatch(saveOrderId(response.data.id))
		})
		.catch((error)=>{
			console.log(error)
		})
	}
}
