// @flow
const initialState = {
  isMyProfileLoading: false,
  currencyList: [],
  myCurrencyIsLoading: true,
  myCurrencyIsSearching: false,
  myCurrencyKeyword: "",
	myNewCard: null,
	customer: null,
	newCardToken: "",
	cardList: [],
	cardListIsLoading: true,
	cardListError: null
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
    case "MY_PROFILE_IS_LOADING":{
			return {
				...state,
				isMyProfileLoading: action.isLoading,
			};
			break;
		}
		case "CARD_LIST_IS_LOADING":{
			return {
				...state,
				cardListIsLoading: action.isLoading,
			};
			break;
		}
		case "FETCH_CARD_LIST_SUCCESS":{
			return {
				...state,
				cardList: action.cardList,
				cardListError: null,
			};
			break;
		}
		case "FETCH_CARD_LIST_ERROR":{
			return {
				...state,
				cardListError: action.error,
				cardList: [],
			};
			break;
		}
    case "MY_CURRENCY_IS_LOADING":{
			return {
				...state,
				myCurrencyIsLoading: action.isLoading,
			};
			break;
		}
		case "FETCH_MY_CURRENCY":{
			return {
				...state,
				currencyList: action.currency,
				myCurrencyIsLoading: false,
			};
			break;
		}
		case "CURRENCY_IS_SEARCHING":{
			return {
				...state,
				myCurrencyIsSearching: action.isSearching,
			};
			break;
		}
		case "SET_MY_CURRENCY_KEYWORD":{
			return{
				...state,
				myCurrencyKeyword: action.keyword,
			}
			break;
		}
		case "SET_MY_NEW_CARD": {
			return{
				...state,
				myNewCard: action.card,
			}
		}
		case "CREATE_NEW_CUSTOMER_SUCCESS":{
			return {
				...state,
				customer: action.customer,
			}
		}
		case "CREATE_NEW_CARD_SUCCESS":{
			return {
				...state,
				newCardToken: action.token,
			}
		}
	}
	return state;
}
