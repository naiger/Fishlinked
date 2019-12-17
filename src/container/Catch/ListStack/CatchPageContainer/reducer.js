// @flow
const initialState = {
	isOpen: false,
	photoIndex: 0,
};

export default function(state: any = initialState, action: Function) {
	if (action.type === "OPEN_PHOTO_VIEWER") {
		return {
			...state,
			isOpen: action.isOpen,
			photoIndex: action.index,
		};
	}
	return state;
}
