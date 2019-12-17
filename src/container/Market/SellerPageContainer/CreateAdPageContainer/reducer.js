// @flow
const initialState = {
	categories: [],
	categoriesIsLoading: true,
	categoriesError: null,
	isNew: true,
	productCategory: 1,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "FETCH_CATEGORIES_SUCCESS":{
			return {
				...state,
				categories: action.categories,
			};
			break;
		}
		case "CATEGORIES_IS_LOADING":{
			return {
				...state,
				categoriesIsLoading: action.isLoading,
			};
			break;
		}
		case "FETCH_CATEGORIES_ERROR":{
			return {
				...state,
				categories:[],
				categoriesError: action.error,
			};
			break;
		}
		case "SET_CATEGORY": {
			return {
				...state,
				productCategory: action.category
			};
			break;
		}
	}
	return state;
}
