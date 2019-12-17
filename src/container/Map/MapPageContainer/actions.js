// @flow
import axios from "axios";

export function setMapRegion(region: Object) {
	return {
		type: "SET_MAP_REGION",
		region,
	};
}
export function resetMapRegion() {
	return {
		type: "RESET_MAP_REGION",
	};
}
export function googleIsSearching(bool: boolean){
	return {
		type: "GOOGLE_IS_SEARCHING",
		bool,
	}
}
export function googleSearchSuccess(region: Object) {
	return {
		type: "GOOGLE_SEARCH_SUCCESS",
		region,
	};
}
export function setSearchLocationKeyword(keyword: string){
	return {
		type: "SET_SEARCH_LOCATION_KEYWORD",
		keyword,
	};
}
export function getLocationFromGoogle(placename: string){
	//pk_live_vNzkqWjTCk4EVJ5MsbwFg9e8;
	GOOGLE_API_KEY = "AIzaSyCii20hktjB-IQY1dk4B8aORkhEYTJlQfs";
	const instance = axios.create({
		baseURL: "https://maps.googleapis.com/maps/api/place/textsearch/"
	});
	let data = new Object;
	data.key = GOOGLE_API_KEY;
	data.region = "au";
	data.query = placename;
	data.language = "en-AU";
	var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
	console.log(formBody);
	return (dispatch: Function) => {
		dispatch(googleIsSearching(true));
		return instance.post("json?"+formBody).then(response => {
				console.log(response.data.results);
				dispatch(googleIsSearching(false));
				dispatch(googleSearchSuccess(response.data.results[0].geometry.location));
			}).catch(error => {
				console.log(error);
				dispatch(googleIsSearching(false));
			});
	}
}
