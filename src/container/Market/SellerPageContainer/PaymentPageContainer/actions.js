// @flow
import axios from "axios";

export function initialAdPackage(adFee: number, adPeriod: number) {
	return {
		type: "INITIAL_AD_PACKAGE",
		adFee,
		adPeriod,
	};
}
export function setPaymentMethod(method: string) {
	return{
		type: "SET_PAYMENT_METHOD",
		method,
	};
}
