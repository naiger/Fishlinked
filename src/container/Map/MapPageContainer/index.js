import MapPage from "../../../stories/screens/Map/MapPage";
// @flow
import {Body, Header, Left, Right, Title} from 'native-base';
import * as React from "react";
import { connect } from "react-redux";
import {setMapRegion, resetMapRegion, getLocationFromGoogle, setSearchLocationKeyword} from './actions';

export interface Props {
	navigation: any,
	//state
	isLoading: bool,
	list: Array<Object>,
	locationKeyword:string,
	mapRegion: Object,
	mapResetTag: boolean,
	googleIsSearching: boolean,
	//Functions
	fetchCatches: Function,
	setSearchLocationKeyword:Function,
	setMapRegion: Function,
	resetMapRegion: Function,
	getLocationFromGoogle: Function,
}
export interface State {}
class MapPageContainer extends React.Component<Props, State> {
	static navigationOptions = ({ navigation }) => ({
		header: (<Header><Left/><Body><Title>Map</Title></Body><Right/></Header>)
	});
	render() {
		return (
			<MapPage
				navigation={this.props.navigation}
				catchList={this.props.list}
				isLoading={this.props.isLoading}
				catchListIsSearching={this.props.catchListIsSearching}
				searchResult={this.props.searchResult}
				locationKeyword={this.props.locationKeyword}
				setSearchLocationKeyword={this.props.setSearchLocationKeyword}
				mapRegion={this.props.mapRegion}
				setMapRegion={this.props.setMapRegion}
				resetMapRegion={this.props.resetMapRegion}
				mapResetTag={this.props.mapResetTag}
				getLocationFromGoogle={this.props.getLocationFromGoogle}
				googleIsSearching={this.props.googleIsSearching}
			/>
		);
	}
}
function bindAction(dispatch) {
	return {
		setSearchLocationKeyword: keyword => dispatch(setSearchLocationKeyword(keyword)),
		setMapRegion: region => dispatch( setMapRegion(region)),
		resetMapRegion: region => dispatch (resetMapRegion(region)),
		getLocationFromGoogle: placename => dispatch(getLocationFromGoogle(placename)),
	};
}

const mapStateToProps = state => ({
	list: state.catchReducer.list,
	isLoading: state.catchReducer.isLoading,
	error: state.catchReducer.error,
	locationKeyword:state.mapReducer.locationKeyword,
	mapRegion: state.mapReducer.mapRegion,
	mapResetTag: state.mapReducer.mapResetTag,
	googleIsSearching: state.mapReducer.googleIsSearching,
});

export default connect(mapStateToProps, bindAction)(MapPageContainer);
