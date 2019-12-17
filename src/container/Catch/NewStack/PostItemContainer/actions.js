// @flow
import axios from "axios";

export function photoIsUploading(bool: boolean){
	return {
		type: "PHOTO_IS_UPLOADING",
		isUploading: bool,
	};
}
export function catchPhotoUploadSuccess(photo: string, mediaId: number){
	return {
		type: "CARTCH_PHOTO_UPLOAD_SUCCESS",
		photo,
		mediaId,
	};
}
export function setCatchContent(text: string){
	return {
		type: "SET_CATCH_CONTENT",
		text,
	};
}
export function setCatchTitle(text: string){
	return {
		type: "SET_CATCH_TITLE",
		text,
	};
}
export function postValidate(text: string, field: string){
	return {
		type: "POST_VALIDATE",
		text,
		field,
	};
}
export function initialPhotos(){
	return {
		type:"INITIAL_PHOTOS",
	}
}

export function uploadCatchPhoto(photo: string){
	console.log(photo);
	const data = new FormData();
	data.append('file', {
		uri: photo,
		type: 'image/jpeg',
		name: "catchphoto.jpeg",
		}
	);
	console.log(data);
	const mediaLink = "/wp-json/wp/v2/media/";
	return (dispatch: Function) => {
		dispatch( photoIsUploading(true));
		return axios.post(mediaLink, data, {
			headers:{
				'Cache-Control': 'no-cache',
				'Content-Type': 'multipart/form-data',
				'Content-Disposition': "attachment; filename=photo.jpeg",
			}
		})
		.then((response)=>{
			console.log(response.data.id)
			dispatch( catchPhotoUploadSuccess(photo, response.data.id))
			dispatch( photoIsUploading(false))
		})
		.catch((error)=>{
			console.log(error.response.data)
			dispatch( photoIsUploading(false))
		})
	}
}
