// @flow
import axios from "axios";

export function initialProductDescription(description: string) {
	return {
		type: "INITIAL_PRODUCT_DESCRIPTION",
		description,
	};
}
export function initialProductName(name: string) {
	return {
		type: "INITIAL_PRODUCT_NAME",
		name,
	};
}
export function updateProductName(name: string) {
	return {
		type: "UPDATE_PRODUCT_NAME",
		name,
	};
}
export function updateProductDescription(description: string){
	return {
		type: "UPDATE_PRODUCT_DESCRIPTION",
		description,
	}
}
export function descriptionValidate(text: string, field: string){
  return {
    type: "DESCRIPTION_VALIDATE",
    text,
		field,
  }
}
