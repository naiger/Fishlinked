
// @flow
import axios from "axios";

export function memberListIsLoading(isLoading: boolean) {
	return {
		type: "MEMBER_LIST_IS_LOADING",
		isLoading,
	};
}
export function fetchMemberListSuccess(memberList: Array<Object>) {
	return {
		type: "FETCH_MEMBER_LIST_SUCCESS",
		memberList,
	};
}
export function fetchMemberListError(error: Object) {
	return {
		type: "FETCH_MEMBER_LIST_ERROR",
		error,
	};
}
export function startSearchMember(){
	return {
		type:"START_SEARCH_MEMBER",
	};
}
export function stopSearchMember(){
	return {
		type:"STOP_SEARCH_MEMBER",
	};
}
export function searchMemberSuccess(searchResult: Array<Object>) {
	return {
		type: "SEARCH_MEMBER_SUCCESS",
		searchResult,
	};
}
export function searchMemberError(error: Object) {
	return {
		type: "SEARCH_MEMBER_ERROR",
		error,
	};
}
export function memberListIsSearching(isSearching: boolean) {
	return {
		type: "MEMBER_LIST_IS_SEARCHING",
		isSearching,
	};
}
export function setSearchMemberKeyword(keyword: string){
	return {
		type: "SET_SEARCH_MEMBER_KEYWORD",
		keyword,
	};
}
export function searchMember(name: string){
	return (dispatch: Function) => {
		return axios.get("/wp-json/wp/v2/users?search="+name)
		.then((response) => {
			dispatch(searchMemberSuccess(response.data))
			dispatch(memberListIsSearching(false))
		})
		.catch((error) => {
			dispatch(searchMemberError(error))
			dispatch(memberListIsSearching(false))
		});
	};
}

type Context = "view" | "embed" | "edit";
type Order = "asc"| "desc";
type OrderBy = "name" | "id" | "include" | "registered_date" | "slug" | "email" | "url";
export function fetchMemberList(
	options?: {
		context?: Context,
		page?: number,
		per_page?: number,
		search?: string,
		exclude?: number[],
		include?: number[],
		offset?: number,
		order?: Order,
		orderby?: OrderBy,
		slug?: string[],
		roles?: string,
	}) {
		return (dispatch: Function) => {
			return axios.get("/wp-json/wp/v2/users").then((response)=>{
					console.log(response.data)
					dispatch(fetchMemberListSuccess(response.data))
					dispatch(memberListIsLoading(false))
			}).catch((error)=>{
				console.log(error.response.data)
				dispatch(fetchMemberListError(error))
				dispatch(memberListIsLoading(false))
			})
		}
}
