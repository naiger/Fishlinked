// @flow
const initialState = {
	isViewOpen: false,
	imageIndex: 0,
};

export default function(state: any = initialState, action: Function) {
	if (action.type === "OPEN_IMAGE_VIEWER") {
		return {
			...state,
			isViewOpen: action.isOpen,
			imageIndex: action.index,
		};
	}
	return state;
}
