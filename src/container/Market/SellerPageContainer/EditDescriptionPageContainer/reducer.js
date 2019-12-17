// @flow
const initialState = {
	name: "",
	description: "",
	nameValidation: undefined,
	descriptionValidation: undefined,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "INITIAL_PRODUCT_NAME":{
			return {
				...state,
				name: action.name,
				nameValidation: undefined,
			};
			break;
		}
		case "INITIAL_PRODUCT_DESCRIPTION":{
			return {
				...state,
				description: action.description,
				descriptionValidation: undefined,
			};
			break;
		}
		case "UPDATE_PRODUCT_NAME":{
			return {
				...state,
				name: action.name.toString(),
			};
			break;
		}
		case "UPDATE_PRODUCT_DESCRIPTION":{
			return {
				...state,
				description: action.description.toString(),
			};
			break;
		}
		case "DESCRIPTION_VALIDATE":{
			switch(action.field){
				case "description":{
					return {
						...state,
						descriptionValidation: action.text,
					};
					break;
				}
				case "name":{
					return {
						...state,
						nameValidation: action.text,
					};
					break;
				}
			}
			break;
		}
	}
	return state;
}
