//flow
const initialState = {
	selected: [],
	timesOfSelect: 0,
};

export default function(state: any = initialState, action: Function) {
	switch(action.type){
		case "INIT_INDEX":{
			return {
				...state,
				selected: action.initSelected,
			};
			break;
    }
    case "SELECT_PHOTOS":{
			state.selected.splice(action.index, 1, !state.selected[action.index]);
			console.log(state.selected);
      return {
				...state,
				timesOfSelect: state.timesOfSelect +1,
			};
      break;
    }
  }
  return state;
}
