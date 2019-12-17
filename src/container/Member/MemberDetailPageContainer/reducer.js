// @flow
const initialState = {
	memberIsLoading: true,
	member: null,
	memberError:null,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "FETCH_MEMBER_SUCCESS":{
			return {
				...state,
				member: action.member,
				memberError: null,
			};
			break;
		}
		case "FETCH_MEMBER_ERROR":{
			return{
				...state,
				member:[],
				memberError:action.error,
			};
			break;
		}
		case "MEMBER_IS_LOADING":{
			return {
				...state,
				memberIsLoading: action.isLoading,
			};
			break;
		}
	}
	return state;
}
