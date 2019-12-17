// @flow
import axios from "axios";

export function categoriesIsLoading(bool: boolean) {
	return {
		type: "CATEGORIES_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchCategoriesSuccess(categories: Array<Object>) {
	return {
		type: "FETCH_CATEGORIES_SUCCESS",
		categories,
	};
}
export function fetchCategoriesError(error: Object) {
	return {
		type: "FETCH_CATEGORIES_ERROR",
		error,
	};
}

type Context = "view" | "embed" | "edit";
type Order = "asc"| "desc";
type OrderBy = "name" | "id" | "include" | "sluge" | "term_group" | "description" | "count" ;
export function fetchCategories(
	options?: {
		context?: Context,
		page?: number,
		per_page?: number,
		search?: string,
		exclude?: number,
		include?: number,
		order?: Order,
		orderby?: OrderBy,
		hide_empty?: boolean,
		parent?: number,
		post?: number,
		slug?: string[],
	}) {
		return (dispatch: Function) => {
			dispatch(categoriesIsLoading(true));
			return axios.get("https://fishlinked.sk8tech.io/wp-json/wp/v2/categories",{
		    params: options
		  }).then((response)=>{
					dispatch(fetchCategoriesSuccess(response.data))
					dispatch(categoriesIsLoading(false))
			}).catch((error)=>{
				dispatch(fetchCategoriesError(error))
				dispatch(categoriesIsLoading(false))
			})
		}
}
