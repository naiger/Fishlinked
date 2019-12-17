const initialState = {
	myAds: [],
	myAdsIsLoading: true,
	myAdsError: null,
	del: false,
	removedAd: 0,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "FETCH_MYADS_SUCCESS":{
			return {
				...state,
				myAds: action.myAds,
			};
			break;
		}
		case "MYADS_IS_LOADING":{
			return {
				...state,
				myAdsIsLoading: action.isLoading,
			};
			break;
		}
		case "FETCH_MYADS_ERROR":{
			return {
				...state,
				myAds:[],
				myAdsError: action.error,
			};
			break;
		}
		case "ITEM_IS_READY_TO_REMOVE": {
			return {
				...state,
				del: !state.del,
			};
			break;
		}
		case "REMOVE_AD": {
			state.myAds.splice(action.adIndex, 1);
			return {
				...state,
				removedAd: state.removedAd +1,
			};
			break;
		}
		case "UPDATE_AD": {
			let newAds = state.myAds;
			for (let i = 0; i < state.myAds.length; i++){
				if (state.myAds[i].id === action.id){
					state.myAds[i].images = action.images;
			 		state.myAds[i].title.rendered = action.name;
					state.myAds[i].description = action.description;
				}
			}
			return {
				...state,
				myAds: newAds,
			}
		}
		case "CREATE_NEW_AD": {
			console.log(action.ad);
			return {
				...state,
				myAds: [action.ad, ...state.myAds],
			};
			break;
		}
	}
	return state;
}
