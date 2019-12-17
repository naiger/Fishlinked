// @flow
import axios from "axios";
import {fetchCurrentUser} from '../../Auth/LoginPageContainer/actions';

export function CardListIsLoading(bool: boolean) {
	return {
		type: "CARD_LIST_IS_LOADING",
		isLoading: bool,
	};
}
export function FetchCardListSuccess(cardList: Array<Object>) {
	return {
		type: "FETCH_CARD_LIST_SUCCESS",
		cardList,
	};
}
export function FetchCardListError(error: Object) {
	return {
		type: "FETCH_CARD_LIST_ERROR",
		error,
	};
}
export function MyProfileIsLoading(bool: boolean){
	return {
		type: "MY_PROFILE_IS_LOADING",
		isLoading: bool,
	}
}

export function myCurrencyIsLoading(bool: boolean) {
	return {
		type: "MY_CURRENCY_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchMyCurrency(currency: Array<Object>){
	return {
		type:"FETCH_MY_CURRENCY",
		currency,
	}
}
export function currencyIsSearching(bool: boolean) {
	return {
		type: "CURRENCY_IS_SEARCHING",
		isSearching: bool,
	};
}
export function setMyCurrencyKeyword(keyword: string) {
	return {
		type: "SET_MY_CURRENCY_KEYWORD",
		keyword,
	}
}
export function setMyNewCard(card: Object) {
	return {
		type: "SET_MY_NEW_CARD",
		card,
	}
}

export function uploadAvatar(avatar: string) {
	const data = new FormData();
	data.append('file', {
		uri: avatar,
		type: 'image/jpeg',
		name: "avatar.jpeg",
		}
	);
	console.log(data);
	const mediaLink = "/wp-json/wp/v2/media/";
	return (dispatch: Function) => {
		dispatch( MyProfileIsLoading(true));
		return axios.post(mediaLink, data, {
			headers:{
				'Cache-Control': 'no-cache',
				'Content-Type': 'multipart/form-data',
				'Content-Disposition': "attachment; filename=avatar.jpeg",
			}
		})
		.then((response)=>{
			console.log(response.data.source_url)
      let data = {"avatar_urls": response.data.source_url};
			dispatch( updateMyProfile(data));
		})
		.catch((error)=>{
			console.log(error.response.data)
			dispatch( MyProfileIsLoading(false))
		})
	}
}
export function updateMyProfile(data: Object){
	const myProfileLink = "/wp-json/wp/v2/users/me";
	return (dispatch: Function) => {
		dispatch(MyProfileIsLoading(true))
		return axios.post(myProfileLink, data)
		.then((response)=>{
			console.log(response.data)
			dispatch(fetchCurrentUser());
			dispatch(FetchCardList(response.data.acf.stripe_customer_id))
		})
		.catch((error)=>{
			dispatch(MyProfileIsLoading(false))
		})
	}
}

export function createNewCard(cardDetails: Object){
	// pk_live_vNzkqWjTCk4EVJ5MsbwFg9e8
	// pk_test_Y8JPLaEjF2YJHtp1XesuX3cn
	PUBLISHABLE_KEY = "Bearer pk_test_Y8JPLaEjF2YJHtp1XesuX3cn";
	const instance = axios.create({
		baseURL: "https://api.stripe.com/v1/tokens"
	});
	var formBody = [];
  for (var property in cardDetails) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(cardDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
	console.log(formBody);
	return (dispatch: Function) => {
		dispatch(CardListIsLoading(true));
		return instance.post("", formBody, {
			headers:{
				'Authorization': PUBLISHABLE_KEY,
				'Cache-Control': 'no-cache',
				'Content-Type': 'application/x-www-form-urlencoded'
			}}).then((response) => {
				console.log(response.data);
				return response.data.id;
			}).catch(error => {
				console.log(error);
				dispatch(CardListIsLoading(false));
			});
	}
}
export function updateStripeCustomer(token: string, id: string){
	// sk_live_BgzjjSbJEdrNpUBR9uGT9jjX
	// sk_test_aUHk8kgKOIt3v3HQN9RgBXMf
	const baseURL = "https://api.stripe.com/v1/customers/";
	SECRET_KEY = "Bearer sk_test_aUHk8kgKOIt3v3HQN9RgBXMf";
	let url = "";
	id === undefined || id === ""
	? url = baseURL+"source="+token
	: url = baseURL+id+"/sources?source="+token
	const instance = axios.create({
		baseURL: url,
		headers:{
			'Authorization': SECRET_KEY,
			'Cache-Control': 'no-cache',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	console.log(url);
	return (dispatch: Function) => {
		return instance.post().then(response => {
				console.log(response.data);
				return response.data.customer;
			}).catch(error => {
				console.log(error);
				dispatch(CardListIsLoading(false));
			});
	}
}

export function FetchCardList(id: string){
	SECRET_KEY = "Bearer sk_test_aUHk8kgKOIt3v3HQN9RgBXMf";
	const instance = axios.create({
		baseURL: "https://api.stripe.com/v1/customers/"+id,
		headers: { 'Authorization': SECRET_KEY }
	});
	return (dispatch: Function) => {
		return instance.get().then(response => {
			dispatch(FetchCardListSuccess(response.data.sources.data))
			dispatch(CardListIsLoading(false))
			}).catch(error => {
				console.log(error);
				dispatch(FetchCardListError(error.response.data))
				dispatch(CardListIsLoading(false))
			});
	}
}
