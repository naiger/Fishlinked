// @flow
const initialState = {
	catchGallery:[],
	catchPicked: [],
	catchAfter: null,
	catchHas_next_page: false,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "GET_CATCH_PHOTOS":{
			return {
				...state,
				catchGallery: [...action.uris],
				catchAfter: action.after,
				catchHas_next_page: action.has_next_page,
			};
			break;
		}
		case "INITIAL_CATCH_PICKED":{
			return {
				...state,
				catchPicked: action.initPicked,
			};
			break;
		}
		case "PICK_CATCH_PHOTO": {
			state.catchPicked.splice(action.index, 1, !state.catchPicked[action.index]);
			console.log(state.catchPicked);
			return state;
			break;
		}
	}
	return state;
}
