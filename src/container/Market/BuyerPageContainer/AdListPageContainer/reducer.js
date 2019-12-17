// @flow
const initialState = {
	adList: [],
	adsIsLoading: false,
	adListError: null,
	likeList: [],
	likeIsLoading: true,
	seller: null,
	sellerError: null,
	sellerIsLoading: false,
	adsIsSearching: false,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "ADD_TO_LIKE_LIST": {
			return {
				...state,
				likeList: [...state.likeList, action.id],
			};
			break;
		}
		case "REMOVE_FROM_LIKE_LIST":{
			let index = state.likeList.indexOf(action.id);
			state.likeList.splice(index,1);
			return state;
			break;
		}
		case "INITIAL_LIKE_LIST": {
			console.log(action.likeList);
			return {
				...state,
				likeList: action.likeList,
				likeIsLoading: action.isLoading,
			};
			break;
		}
		case "FETCH_ADLIST_SUCCESS":{
			return {
				...state,
				adList: action.adList,
			};
			break;
		}
		case "ADLIST_IS_LOADING":{
			return {
				...state,
				adsIsLoading: action.isLoading,
			};
			break;
		}
		case "FETCH_ADLIST_ERROR":{
			return {
				...state,
				adList:[],
				adListError: action.error,
			};
			break;
		}
		case "FETCH_SELLER_SUCCESS":{
			return {
				...state,
				seller: action.seller,
				sellerError: null,
			};
			break;
		}
		case "FETCH_SELLER_ERROR":{
			return {
				...state,
				seller: null,
				sellerError: action.error,
			};
			break;
		}
		case "SELLER_IS_LOADING":{
			return {
				...state,
				sellerIsLoading: action.isLoading,
			};
			break;
		}
		case "ENABLE_ADS_SEARCH":{
			return {
				...state,
				adsIsSearching: action.isSearching,
			};
			break;
		}
	}
	return state;
}
