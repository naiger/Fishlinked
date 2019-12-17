import axios from "axios";

export function paymentIsProcessing (bool: boolean){
  return {
    type: "PAYMENT_PROCESSING",
    isProcessing: bool,
  };
}
export function paymentSuccess (status: number){
  return {
    type: "PAYMENT_SUCCESS",
    status,
  };
}
export function paymentFailed (message: string){
  return {
    type: "PAYMENT_FAILED",
    message,
  };
}
export function payForAd (orderId: number, cardToken: string){
  const paymentLink = "/wp-json/wc/v2/payment";
  const payment = new Object;
  payment.payment_method = "stripe";
  payment.order_id = orderId;
  payment.payment_token = cardToken;
  console.log(payment);
  return (dispatch: Function) => {
    dispatch( paymentIsProcessing(true))
		return axios.post(paymentLink, payment)
    .then((response) => {
      dispatch( paymentSuccess(response.data.code));
      dispatch( paymentIsProcessing(false));
      console.log(response.data);
    }).catch((error) => {
      dispatch( paymentFailed(error.response.data));
      dispatch( paymentIsProcessing(false));
      console.log(error.response.data);
    });
  }
}
