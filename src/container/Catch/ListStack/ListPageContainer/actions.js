// @flow
import axios from "axios";

export function listIsLoading(bool: boolean) {
	return {
		type: "LIST_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchListSuccess(list: Array<Object>) {
	return {
		type: "FETCH_LIST_SUCCESS",
		list,
	};
}
export function fetchListError(error: Object) {
	return {
		type: "FETCH_LIST_ERROR",
		error,
	};
}
export function catchSearchSuccess(searchResult: Array<Object>){
	return{
		type: "CATCH_SEARCH_SUCCESS",
		searchResult,
	};
}
export function searchCatchError(error: Object){
	return{
		type:"SEARCH_CATCH_ERROR",
		error,
	};
}
export function catchListIsSearching(isSearching: boolean){
	return{
		type:"CATCH_LIST_IS_SEARCHING",
		isSearching,
	};
}
export function setSearchCatchKeyword(keyword:string){
	return{
		type: "SET_SEARCH_CATCH_KEYWORD",
		keyword,
	};
}
export function searchCatch(name: string){
	return (dispatch: Function) => {
		dispatch(catchListIsSearching(true))
		return axios.get("/wp-json/wp/v2/catches?search="+ name)
		.then((response) => {
			dispatch(catchSearchSuccess(response.data))
			dispatch(catchListIsSearching(false))
		})
		.catch((error) => {
			dispatch(searchCatchError(error))
			dispatch(catchListIsSearching(false))
		});
	};
}
export function createNewCatch(newCatch: Object){
	const catchlink = "/wp-json/wp/v2/catches/";
	console.log(newCatch);
	return (dispatch: Function) => {
		dispatch(listIsLoading(true));
		return axios.post(catchlink, newCatch)
		.then((response)=>{
			dispatch(fetchList())
		})
		.catch((error)=>{
			dispatch(listIsLoading(false))
			console.log(error.response.data)
		})
	}
}
export function isMyCatch(bool: boolean){
	return{
		type: "IS_MY_CATCH",
		bool,
	};
}

/**
* The Following function handles 'List' request
* @author Jack
* @see https://developer.wordpress.org/rest-api/reference/posts/#arguments
*/
type Context = "view" | "embed" | "edit";
type Order = "asc"| "desc";
type OrderBy = "author" | "date" | "id" | "include" | "modified" | "parent" | "relevance" | "slug" | "title";
type Status = "draft" | "pending" | "published";
export function fetchList(
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
			return axios.get("/wp-json/wp/v2/catches",{
		    params: options
		  }).then((response)=>{
					dispatch(fetchListSuccess(response.data))
					dispatch(listIsLoading(false))
			}).catch((error)=>{
				dispatch(fetchListError(error))
				dispatch(listIsLoading(false))
			})
		}
}
