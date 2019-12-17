import {CameraRoll} from "react-native";
// @flow
const initialState = {
	adImages:[],
	imagesRemoved: false,
	imageBrowserOpen: false,
	imageIsUploading: false,
	imageIsLoading: true,
	media:[],
	removedImages: 0,
	imagesFetched: 0,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "INITIAL_AD_IMAGES":{
			let images = [];
			if (action.length){
				for (let i = 0; i < action.length; i++){
					images = [...images, ""];
				}
			}
			return {
				...state,
				adImages:images,
				media:[],
				imageIsLoading: true,
				removedImages: 0,
				imagesFetched: 0,
			};
			break;
		}
		case "ADD_AD_IMAGES":{
			if (action.index > -1){
				state.adImages.splice(action.index, 1, action.image.guid.rendered);
				return {
					...state,
					media: [...state.media, action.image.id],
					imageBrowserOpen: false,
					imagesFetched: state.imagesFetched + 1,
				}
			}
			else {
				return {
					...state,
					adImages: [...state.adImages, action.image.guid.rendered],
					media: [...state.media, action.image.id],
					imageBrowserOpen: false,
					imagesFetched: state.imagesFetched + 1,
				};
			}
			break;
		}
		case "IMAGE_IS_LOADING":{
			return {
				...state,
				imageIsLoading: action.isLoading,
			};
			break;
		}
		case "IMAGE_IS_UPLOADING":{
			return {
				...state,
				imageIsUploading: action.isUploading,
			};
			break;
		}
		case "REMOVE_AD_IMAGES":{
			let newImages = [];
			let newMedia = [];
			let removed = 0;
			for (let i=0; i<action.selected.length; i++){
				if (action.selected[i]===false){
					newImages.push(state.adImages[i]);
					newMedia.push(state.media[i]);
				}
				else removed += 1;
			}
			return {
				...state,
				adImages: newImages,
				media: newMedia,
				imagesRemoved: true,
				removedImages: removed,
			};
			break;
		}
		case "OPEN_IMAGE_BROWSER": {
			return {
				...state,
				imageBrowserOpen: true,
			}
			break;
		}
	}
	return state;
}
