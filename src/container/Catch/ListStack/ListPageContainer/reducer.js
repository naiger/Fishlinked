// @flow
const initialState = {
	isLoading: true,
	list: [],
	error: null,
	myCatch: false,

	isSearch:false,
	searchResult:[],
	searchError:null,
	searchCatchKeyword:"",
	catchListIsSearching: false,
};

export default function(state: any = initialState, action: Function) {
	   switch(action.type){
			 case "IS_MY_CATCH":{
				 return {
		 			...state,
		 			myCatch: action.bool,
		 		};
			 }
			 case "FETCH_LIST_SUCCESS":{
				 return {
		 			...state,
		 			list: action.list,
		 			error: null,
		 		};
			 }
			 case "FETCH_LIST_ERROR":{
				 return {
		 			...state,
		 			list: [],
		 			error: action.error,
		 		};
			 }
			 case "LIST_IS_LOADING":{
				 return {
		 			...state,
		 			isLoading: action.isLoading,
		 		};
			 }
			 case "CATCH_LIST_IS_SEARCHING" :{
				 return{
					 ...state,
					 catchListIsSearching: action.isSearching,
				 };
			 }
			 case "CATCH_SEARCH_SUCCESS" :{
				 return{
					 ...state,
					 searchResult:action.searchResult,
					 searchError:null,
				 };
			 }
			 case "SEARCH_CATCH_ERROR" :{
				 return{
					 ...state,
					 searchResult:[],
					 searchError:action.error,
				 };
			 }
			case "SET_SEARCH_CATCH_KEYWORD":{
				return{
					...state,
					searchCatchKeyword:action.keyword,
					catchListIsSearching:true,
				};
			}
		 }
	return state;
}
