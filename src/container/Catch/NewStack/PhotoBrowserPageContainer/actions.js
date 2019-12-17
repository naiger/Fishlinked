export function pickCatchPhoto(index: number){
	return{
		type: "PICK_CATCH_PHOTO",
		index,
	}
}
export function getCatchPhotos(uris: Array<string>, after: string, has_next_page: boolean) {
	return {
		type: "GET_CATCH_PHOTOS",
		uris,
		after,
		has_next_page,
	};
}
export function initialCatchPicked(length: number){
	let initPicked = [];
  for (let i = 0; i < length; i++){
    initPicked = [...initPicked, false];
  }
	return{
		type: "INITIAL_CATCH_PICKED",
		initPicked,
	}
}
