// @flow
import axios from "axios";

export function myAdsIsLoading(bool: boolean) {
	return {
		type: "MYADS_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchMyAdsSuccess(myAds: Array<Object>) {
	return {
		type: "FETCH_MYADS_SUCCESS",
		myAds,
	};
}
export function fetchMyAdsError(error: Object) {
	return {
		type: "FETCH_MYADS_ERROR",
		error,
	};
}
export function itemRemove() {
	return {
		type: "ITEM_IS_READY_TO_REMOVE",
	};
}
export function removeAd(userId: number, adId: number){
	const adlink = "/wp-json/wp/v2/ads/"+adId;
	return (dispatch: Function) => {
		return axios.post(adlink, {
			status: "draft",
		})
		.then((response)=>{
			dispatch(fetchMyAdsList(userId))
		})
		.catch((error)=>{
			console.log(error)
		})
	}
}
export function updateAd(values: Object, userId: number, adId: number){
	const adlink = "/wp-json/wp/v2/ads/"+adId;
	console.log(values);
	return (dispatch: Function) => {
		dispatch(myAdsIsLoading(true))
		return axios.post(adlink, values)
		.then((response)=>{
			dispatch(fetchMyAdsList(userId))
		})
		.catch((error)=>{
			console.log(error)
		})
	}
}
export function createNewAd(ad: Object, userId: number){
	const adlink = "/wp-json/wp/v2/ads/";
	console.log(ad);
	return (dispatch: Function) => {
		return axios.post(adlink, ad)
		.then((response)=>{
			dispatch(fetchMyAdsList(userId))
		})
		.catch((error)=>{
			console.log(error)
		})
	}
}

export function activeNewAd(paid: boolean, userId: number){
	const ad = new Object;
	ad.status = "publish";
	const adlink = "/wp-json/wp/v2/ads/";
	return (dispatch: Function) => {
		return axios.post(adlink, ad)
		.then((response)=>{
			dispatch(fetchMyAdsList(userId))
		})
		.catch((error)=>{
			console.log(error)
		})
	}
}

type Context = "view" | "embed" | "edit";
type Order = "asc"| "desc";
type OrderBy = "name" | "id" | "include" | "sluge" | "term_group" | "description" | "count" ;
export function fetchMyAdsList(id: number){
		const adlink = "/wp-json/wp/v2/ads?filter[meta_key]=seller&filter[meta_value]="+id;
		console.log("adlink:"+ id);
		return (dispatch: Function) => {
			return axios.get(adlink)
			.then((response)=>{
					dispatch(fetchMyAdsSuccess(response.data))
					dispatch(myAdsIsLoading(false))
			})
			.catch((error)=>{
				dispatch(fetchMyAdsError(error))
				dispatch(myAdsIsLoading(false))
			})
		}
}
