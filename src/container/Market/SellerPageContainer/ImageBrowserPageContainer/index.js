import {FileSystem} from "expo";
import ImageBrowserPage from "../../../../stories/screens/Market/SellerPage/ImageBrowserPage";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import * as React from "react";
import { Image, View, CameraRoll } from "react-native";
import {connect} from "react-redux";
import {addAdImages, uploadImage} from '../EditAdPageContainer/actions';
import {getPhotos, initialPicked, pickImage, imageBrowserCallback} from './actions';
export interface Props {
	//state
	navigation: any;
	after: string,
	picked: Array<boolean>,
	has_next_page: boolean,
	gallery: Array<string>,
	adImages: Array<string>,
	//Functions
	getPhotos: Function,
	initialPicked: Function,
	pickImage: Function,
	addAdImages: Function,
	uploadImage: Function,
}
export interface State {}
class ImageBrowserPageContainer extends React.Component<Props, State> {
	//get images from gallery
	getPhotos = () => {
    let params = { first: 50, mimeTypes: ["image/jpeg"] };
    if (this.props.after) {params.after = this.props.after;}
    if (!this.props.has_next_page){
			return(
	    CameraRoll.getPhotos(params)
	      .then(r => this.processPhotos(r))
				.catch(e => alert(e))
			);
		}
  }
	//set state gallery
	processPhotos = (r) => {
    if (this.props.after === r.page_info.end_cursor) return;
    let uris = r.edges.map(i=> i.node).map(i=> i.image).map(i=>i.uri);
		this.props.initialPicked(uris.length);
    this.props.getPhotos(uris, r.page_info.end_cursor, r.page_info.has_next_page);
		this.forceUpdate();
  }
	//return picked photos
	callback = () =>{
		let callback = [];
		for (let i = 0; i < this.props.picked.length; i++){
			if (this.props.picked[i] === true){
				callback = [...callback, this.props.gallery[i]];
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
				<ImageBrowserPage
					navigation={this.props.navigation}
					gallery={this.props.gallery}
					picked={this.props.picked}
					pickImage={this.props.pickImage}
					callback={this.callback}
					addAdImages={this.props.addAdImages}
					adImages={this.props.adImages}
					uploadImage={this.props.uploadImage}
				/>
			);
	}
}

function bindAction(dispatch) {
	return {
		getPhotos: r => dispatch( getPhotos(r)),
		initialPicked: length => dispatch( initialPicked(length)),
		pickImage: index => dispatch( pickImage(index)),
		addAdImages: (images, index) => dispatch( addAdImages(images, index)),
		uploadImage: image => dispatch( uploadImage(image)),
	};
}

const mapStateToProps = state => ({
	 gallery: state.imageBrowserReducer.gallery,
	 after: state.imageBrowserReducer.after,
	 has_next_page: state.imageBrowserReducer.has_next_page,
	 picked: state.imageBrowserReducer.picked,
	 adImages: state.editAdReducer.adImages,
});

export default connect(mapStateToProps, bindAction)(ImageBrowserPageContainer);
