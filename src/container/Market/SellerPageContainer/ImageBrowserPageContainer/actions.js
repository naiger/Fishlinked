export function pickImage(index: number){
	return{
		type: "PICK_IMAGE",
		index,
	}
}
export function getPhotos(uris: Array<string>, after: string, has_next_page: boolean) {
	return {
		type: "GET_PHOTOS",
		uris,
		after,
		has_next_page,
	};
}
export function initialPicked(length: number){
	let initPicked = [];
  for (let i = 0; i < length; i++){
    initPicked = [...initPicked, false];
  }
	return{
		type: "INITIAL_PICKED",
		initPicked,
	}
}
