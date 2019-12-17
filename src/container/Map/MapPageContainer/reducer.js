// @flow
const initialState = {
	mapRegion: {
    latitude: -33.8688,
    longitude: 151.2093,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
	locationKeyword: "",
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
    case "SET_MAP_REGION":{
			let newRegion = new Object;
      newRegion = {
        latitude: action.region.latitude +0.01,
        longitude: action.region.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
			return {
				...state,
				mapRegion: newRegion,
			};
			break;
		}
		case "RESET_MAP_REGION":{
			return {
				...state,
				mapRegion: {
			    latitude: -33.8688,
			    longitude: 151.2093,
			    latitudeDelta: 0.05,
			    longitudeDelta: 0.05,
			  },
			};
			break;
		}
		case "GOOGLE_SEARCH_SUCCESS":{
			let newRegion = new Object;
      newRegion = {
        latitude: action.region.lat,
        longitude: action.region.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
			return {
				...state,
				mapRegion: newRegion,
			};
			break;
		}
		case "SET_SEARCH_LOCATION_KEYWORD":{
			return {
				...state,
				locationKeyword: action.keyword,
			};
			break;
		}
	}
	return state;
}
