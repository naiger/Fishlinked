export function initIndex(length: number){
  let initSelected = [];
  for (let i = 0; i < length; i++){
    initSelected.push(false);
  }
  return {
    type: "INIT_INDEX",
    initSelected,
  };
}
export function selectPhoto(index: number) {
  return {
		type: "SELECT_PHOTOS",
    index,
	};
}
