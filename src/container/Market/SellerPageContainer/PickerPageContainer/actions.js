// @flow
export function pickerItemsIsLoading(bool: boolean) {
	return {
		type: "PICKER_ITEMS_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchPickerItems(items: Array<Object>){
	return {
		type:"FETCH_PICKER_ITEMS",
		items,
	}
}
export function pickerItemsIsSearching(bool: boolean) {
	return {
		type: "PICKER_ITEMS_IS_SEARCHING",
		isSearching: bool,
	};
}
