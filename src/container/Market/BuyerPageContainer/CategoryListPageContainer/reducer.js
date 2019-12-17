// @flow
const initialState = {
	categories: [],
	categoriesIsLoading: true,
	categoriesError: null,
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
	}
	return state;
}
