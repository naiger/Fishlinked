
// @flow
import axios from "axios";

export function memberIsLoading(isLoading: boolean) {
	return {
		type: "MEMBER_IS_LOADING",
		isLoading,
	};
}
export function fetchMemberSuccess(member: Object) {
	return {
		type: "FETCH_MEMBER_SUCCESS",
		member,
	};
}
export function fetchMemberError(error: Object) {
	return {
		type: "FETCH_MEMBER_ERROR",
		error,
	};
}

export function fetchMember(id: number){
	return (dispatch: Function) => {
		return axios.get("https://fishlinked.sk8tech.io/wp-json/wp/v2/users/"+id)
			.then((response) => {
				dispatch(fetchMemberSuccess(response.data))
				dispatch(memberIsLoading(false))
			})
			.catch((error) => {
				dispatch(fetchMemberError(error))
				dispatch(memberIsLoading(false))
		});
	};
}
