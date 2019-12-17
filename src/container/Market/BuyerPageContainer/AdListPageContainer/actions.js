// @flow
import axios from "axios";

export function adListIsLoading(bool: boolean) {
	return {
		type: "ADLIST_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchAdListSuccess(adList: Array<Object>) {
	return {
		type: "FETCH_ADLIST_SUCCESS",
		adList,
	};
}
export function fetchAdListError(error: Object) {
	return {
		type: "FETCH_ADLIST_ERROR",
		error,
	};
}
export function addToLikeList(id: number) {
	return {
		type: "ADD_TO_LIKE_LIST",
		id,
	}
}
export function removeFromLikeList(id: number){
	return {
		type:"REMOVE_FROM_LIKE_LIST",
		id,
	}
}
export function initialLikeList(likeList: Array<number>, isLoading: boolean){
	return {
		type: "INITIAL_LIKE_LIST",
		likeList,
		isLoading,
	}
}
export function fetchLikeList(){
	return (dispatch: Function) => {
		dispatch(initialLikeList([], true));
    const myLink = "/wp-json/wp/v2/users/me";
    return axios.get(myLink)
    .then((response) => {
			dispatch(initialLikeList(response.data.acf.likes, false));
    })
    .catch((error) => {
      console.log(error);
			dispatch(initialLikeList([], false));
    });
  };
}
export function fetchSellerSuccess(seller: Object) {
	return {
		type: "FETCH_SELLER_SUCCESS",
		seller,
	};
}
export function fetchSellerError(error: Object) {
	return {
		type: "FETCH_SELLER_ERROR",
		error,
	};
}
export function sellerIsLoading(bool: boolean) {
	return {
		type: "SELLER_IS_LOADING",
		isLoading: bool,
	};
}
export function enableAdsSearch(bool: boolean) {
	return {
		type: "ENABLE_ADS_SEARCH",
		isSearching: bool,
	};
}
export function fetchSeller(sellerId: number){
	console.log("Seller ID: "+ sellerId);
	return (dispatch: Function) => {
		dispatch( sellerIsLoading(true));
    const sellerLink = "/wp-json/wp/v2/users/"+sellerId;
    return axios.get(sellerLink)
    .then((response) => {
			dispatch(fetchSellerSuccess(response.data))
			dispatch( sellerIsLoading(false))
		})
    .catch((error) => {
			dispatch(fetchSellerError(error))
			dispatch( sellerIsLoading(false))
		})
  };
}
type Context = "view" | "embed" | "edit";
type Order = "asc"| "desc";
type OrderBy = "author" | "date" | "id" | "include" | "modified" | "parent" | "relevance" | "slug" | "title";
type Status = "draft" | "pending" | "published";
export function fetchAdList(
	options?: {
		context?: Context,
		page?: number,
		per_page?: number,
		search?: string,
		after?: string,
		author?: number[],
		author_exclude?: number[],
		before?: string,
		exclude?: number[],
		include?: number[],
		offset?: number,
		zorder?: Order,
		orderby?: OrderBy,
		slug?: string[],
		status?: Status,
		categories?: number[],
		categories_exclude?: number[],
		tags?: number[],
		tags_exclude?: number[],
		sticky?: boolean,
	}) {
		return (dispatch: Function) => {
			dispatch(adListIsLoading(true));
			return axios.get("/wp-json/wp/v2/ads",{
		    params: options
		  }).then((response)=>{
					dispatch(fetchAdListSuccess(response.data))
					dispatch(adListIsLoading(false))
			}).catch((error)=>{
				dispatch(fetchAdListError(error))
				dispatch(adListIsLoading(false))
			})
		}
}
