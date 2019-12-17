const initialState = {
  fish: "",
	bait: "",
	tide: "",
	equipment: "",
	weight: null,
  region: {
    latitude: -33.8788,
    longitude: 151.2093,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
  catchMarker: null,
  catchFishValid: undefined,
  catchBaitValid: undefined,
  catchTideValid: undefined,
  catchEquipmentValid: undefined,
  catchWeightValid: undefined,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
    case "INITIAL_CATCH_INFO":{
			return {
        fish: "",
      	bait: "",
      	tide: "",
      	equipment: "",
      	weight: null,
        region: {
          latitude: -33.8788,
          longitude: 151.2093,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        catchMarker: null,
        catchFishValid: undefined,
        catchBaitValid: undefined,
        catchTideValid: undefined,
        catchEquipmentValid: undefined,
        catchWeightValid: undefined,
			};
			break;
		}
    case "SET_CATCH_MARKER":{
			return {
				...state,
				catchMarker: action.location,
			};
			break;
		}
    case "SET_MAP_VIEW":{
      let newRegion = new Object;
      newRegion = {
        latitude: action.location.latitude,
        longitude: action.location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      return {
        ...state,
        region: newRegion,
      };
      break;
    }
		case "SET_CATCH_INFO":{
      console.log(state);
      switch(action.field){
        case "FISH":{
          return {
            ...state,
    				fish: action.text,
          };
          break;
        }
        case "BAIT":{
          return {
            ...state,
    				bait: action.text,
          };
          break;
        }
        case "TIDE":{
          return {
            ...state,
    				tide: action.text,
          };
          break;
        }
        case "EQUIPMENT":{
          return {
            ...state,
    				equipment: action.text,
          };
          break;
        }
        case "WEIGHT":{
          return {
            ...state,
    				weight: action.text,
          };
          break;
        }
        break;
      }
    }
      case "CATCH_INFO_VALIDATE": {
        console.log(state.catchValidation);
        switch(action.field){
          case "FISH":{
            return {
              ...state,
              catchFishValid: action.text,
            }
            break;
          }
          case "BAIT":{
            return {
              ...state,
              catchBaitValid: action.text,
            }
            break;
          }
          case "TIDE":{
            return {
              ...state,
              catchTideValid: action.text,
            }
            break;
          }
          case "EQUIPMENT":{
            return {
              ...state,
              catchEquipmentValid: action.text,
            }
            break;
          }
          case "WEIGHT":{
            return {
              ...state,
              catchWeightValid: action.text,
            }
            break;
          }
        break;
      }
      break;
	  }
  }
	return state;
}
