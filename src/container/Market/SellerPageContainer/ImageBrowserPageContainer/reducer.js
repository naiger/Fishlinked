import {CameraRoll} from "react-native";
// @flow
const initialState = {
	gallery:[],
	picked: [],
	after: null,
	has_next_page: false,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "GET_PHOTOS":{
			return {
				...state,
				gallery: [...action.uris],
				after: action.after,
				has_next_page: action.has_next_page,
			};
			break;
		}
		case "INITIAL_PICKED":{
			return {
				...state,
				picked: action.initPicked,
			};
			break;
		}
		case "PICK_IMAGE": {
			state.picked.splice(action.index, 1, !state.picked[action.index]);
			console.log(state.picked);
			return state;
			break;
		}
	}
	return state;
}
