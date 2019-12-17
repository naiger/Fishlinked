// @flow
export function setCatchInfo(text:string, field: string){
  return{
    type: "SET_CATCH_INFO",
    text,
    field
  };
}
export function setMapView(location: Object){
  return{
    type: "SET_MAP_VIEW",
    location,
  };
}
export function setCatchMarker(location: Object){
	return {
		type: "SET_CATCH_MARKER",
		location,
	};
}
export function initialCatchInfo(){
  return {
    type: "INITIAL_CATCH_INFO",
  }
}
export function catchInfoValidate(result: string, field: string){
  return {
    type: "CATCH_INFO_VALIDATE",
    text: result,
    field,
  }
}
