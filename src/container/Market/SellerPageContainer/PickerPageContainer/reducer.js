// @flow
const initialState = {
	pickerItems: [],
	itemsIsLoading: true,
	itemsIsSearching: false,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "PICKER_ITEMS_IS_LOADING":{
			return {
				...state,
				itemsIsLoading: action.isLoading,
			};
			break;
		}
		case "FETCH_PICKER_ITEMS":{
			return {
				...state,
				pickerItems: action.items,
				itemsIsLoading: false,
			};
			break;
		}
		case "PICKER_ITEMS_IS_SEARCHING":{
			return {
				...state,
				itemsIsSearching: action.isSearching,
			};
			break;
		}
	}
	return state;
}
