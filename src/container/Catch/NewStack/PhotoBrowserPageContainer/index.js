import PhotoBrowserPage from '../../../../stories/screens/Catch/NewStack/PhotoBrowserPage';
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import * as React from "react";
import { Image, View, CameraRoll } from "react-native";
import {connect} from "react-redux";
import {uploadCatchPhoto} from '../PostItemContainer/actions';
import {getCatchPhotos, initialCatchPicked, pickCatchPhoto} from './actions';

export interface Props {
	//state
	navigation: any;
	catchAfter: string,
	catchPicked: Array<boolean>,
	catchHas_next_page: boolean,
	catchGallery: Array<string>,
	//Functions
	getCatchPhotos: Function,
	initialCatchPicked: Function,
	pickCatchPhoto: Function,
	uploadCatchPhoto: Function,
}
export interface State {}
class PhotoBrowserPageContainer extends React.Component<Props, State> {
	//get images from gallery
	getPhotos = () => {
    let params = { first: 50, mimeTypes: ["image/jpeg"] };
    if (this.props.catchAfter) {params.after = this.props.catchAfter;}
    if (!this.props.catchHas_next_page){
			return(
	    CameraRoll.getPhotos(params)
	      .then(r => this.processPhotos(r))
				.catch(e => alert(e))
			);
		}
  }
	//set state gallery
	processPhotos = (r) => {
    if (this.props.catchAfter === r.page_info.end_cursor) return;
    let uris = r.edges.map(i=> i.node).map(i=> i.image).map(i=>i.uri);
		this.props.initialCatchPicked(uris.length);
    this.props.getCatchPhotos(uris, r.page_info.end_cursor, r.page_info.has_next_page);
		this.forceUpdate();
  }
	//return picked photos
	callback = () =>{
		let callback = [];
		for (let i = 0; i < this.props.catchPicked.length; i++){
			if (this.props.catchPicked[i] === true){
				callback = [...callback, this.props.catchGallery[i]];
			}
		}
		return callback;
	}
	//initialize gallery
	componentDidMount(){
		this.getPhotos();
	}

	render() {
			return (
				<PhotoBrowserPage
					navigation={this.props.navigation}
					catchGallery={this.props.catchGallery}
					catchPicked={this.props.catchPicked}
					pickCatchPhoto={this.props.pickCatchPhoto}
					callback={this.callback}
					uploadCatchPhoto={this.props.uploadCatchPhoto}
				/>
			);
	}
}

function bindAction(dispatch) {
	return {
		getCatchPhotos: r => dispatch( getCatchPhotos(r)),
		initialCatchPicked: length => dispatch( initialCatchPicked(length)),
		pickCatchPhoto: index => dispatch( pickCatchPhoto(index)),
		uploadCatchPhoto: photo => dispatch( uploadCatchPhoto(photo)),
	};
}

const mapStateToProps = state => ({
	 catchGallery: state.photoBrowserReducer.catchGallery,
	 catchAfter: state.photoBrowserReducer.catchAfter,
	 catchHas_next_page: state.photoBrowserReducer.catchHas_next_page,
	 catchPicked: state.photoBrowserReducer.catchPicked,
});

export default connect(mapStateToProps, bindAction)(PhotoBrowserPageContainer);
