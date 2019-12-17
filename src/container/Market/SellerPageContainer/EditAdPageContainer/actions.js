// @flow
import axios from "axios";
import {FileSystem} from 'expo';
export function initialAdImages(length?: number) {
	return {
		type: "INITIAL_AD_IMAGES",
		length,
	};
}
export function adImageIsLoading(bool: boolean){
	return {
		type: "IMAGE_IS_LOADING",
		isLoading: bool,
	}
}
export function addAdImages(image: Object, index: number) {
	return {
		type: "ADD_AD_IMAGES",
		image,
		index,
	};
}
export function imageIsUploading(bool: boolean){
	return {
		type: "IMAGE_IS_UPLOADING",
		isUploading: bool,
	}
}
export function removeAdImages(selected: Array<boolean>) {
	return {
		type: "REMOVE_AD_IMAGES",
		selected,
	};
}
export function openImageBrowser() {
	return {
		type: "OPEN_IMAGE_BROWSER",
	}
}

export function fetchAdImages(image: number, index: number){
	console.log("fetch ad images " +image +" " + index);
	const imageLink = "/wp-json/wp/v2/media/"+image;
	return (dispatch: Function) => {
		return axios.get(imageLink)
		.then((response)=>{
			dispatch( addAdImages(response.data, index))
		})
		.catch((error)=>{
			console.log(error)
			dispatch( adImageIsLoading(false))
		})
	}
}

export function uploadImage(image: string){
	console.log(image);
	const data = new FormData();
	data.append('file', {
		uri: image,
		type: 'image/jpeg',
		name: "photo.jpeg",
		}
	);
	console.log(data);
	const mediaLink = "/wp-json/wp/v2/media/";
	return (dispatch: Function) => {
		dispatch( imageIsUploading(true));
		return axios.post(mediaLink, data, {
			headers:{
				'Cache-Control': 'no-cache',
				'Content-Type': 'multipart/form-data',
				'Content-Disposition': "attachment; filename=photo.jpeg",
			}
		})
		.then((response)=>{
			dispatch( addAdImages(response.data, -1))
			dispatch( imageIsUploading(false))
			console.log(response.data.guid.rendered)
		})
		.catch((error)=>{
			console.log(error.response.data)
			dispatch( imageIsUploading(false))
		})
	}
}
