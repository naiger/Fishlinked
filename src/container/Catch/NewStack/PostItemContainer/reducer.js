// @flow
const initialState = {
	photoUploading: false,
	catchMedia: [],
	catchPhotos: [],
	catchContent: "",
	catchTitle: "",
	titleValidation: undefined,
	contentValidation: undefined,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "INITIAL_PHOTOS":{
			return {
				photoUploading: false,
				catchMedia: [],
				catchPhotos: [],
				catchContent: "",
				catchTitle: "",
				titleValidation: undefined,
				contentValidation: undefined,
			};
			break;
		}
		case "PHOTO_IS_UPLOADING":{
			return {
				...state,
				photoUploading: action.isUploading,
			};
			break;
		}
		case "CARTCH_PHOTO_UPLOAD_SUCCESS":{
			console.log("Catch Photos: "+action.photo);
			return {
				...state,
				 catchPhotos: [...state.catchPhotos, action.photo],
				 catchMedia: [...state.catchMedia, action.mediaId],
			};
			break;
		}
		case "SET_CATCH_TITLE":{
			return {
				...state,
				catchTitle: action.text,
			};
			break;
		}
		case "SET_CATCH_CONTENT":{
			return {
				...state,
				catchContent: action.text,
			};
			break;
		}
		case "POST_VALIDATE":{
			switch(action.field){
				case "TITLE":{
					return {
						...state,
						titleValidation: action.text,
					};
					break;
				}
				case "CONTENT":{
					return {
						...state,
						contentValidation: action.text,
					};
					break;
				}
			}
			break;
		}
	}
	return state;
}
