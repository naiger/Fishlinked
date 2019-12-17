// @flow
const initialState = {
	memberListIsLoading: true,
	memberList: [],
	memberListError:null,
	isSearch: false,
	searchResult: [],
	searchError: null,
	searchMembeKeyword: "",
	memberListIsSearching: true,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "FETCH_MEMBER_LIST_SUCCESS":{
			return {
				...state,
				memberList: action.memberList,
				memberListError: null,
			};
			break;
		}
		case "FETCH_MEMBER_LIST_ERROR":{
			return{
				...state,
				memberList:[],
				memberListError:action.error,
			};
			break;
		}
		case "MEMBER_LIST_IS_LOADING":{
			return {
				...state,
				memberListIsLoading: action.isLoading,
			};
			break;
		}
		case "START_SEARCH_MEMBER":{
			return {
				...state,
				isSearch: true,
			}
			break;
		}
		case "STOP_SEARCH_MEMBER":{
			return {
				...state,
				isSearch: false,
				searchResult:[],
				searchMembeKeyword: "",
			}
			break;
		}
		case "MEMBER_LIST_IS_SEARCHING":{
			return {
				...state,
				memberListIsSearching: action.isSearching,
			};
			break;
		}
		case "SEARCH_MEMBER_SUCCESS":{
			return {
				...state,
				searchResult: action.searchResult,
				searchError: null,
			}
			break;
		}
		case "SEARCH_MEMBER_ERROR":{
			return {
				...state,
				searchResult: [],
				searchError: action.error,
			}
			break;
		}
		case "SET_SEARCH_MEMBER_KEYWORD":{
			return {
				...state,
				searchMembeKeyword: action.keyword,
				memberListIsSearching: true,
			}
		}
	}
	return state;
}
