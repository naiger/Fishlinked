import DeletePhotosPage from "../../../../stories/screens/Market/SellerPage/DeletePhotosPage";
import {removeAdImages, adImageIsLoading} from '../EditAdPageContainer/actions';
import { selectPhoto, deletePhotos, initIndex } from "./actions";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
import {connect} from "react-redux";
import styles from './styles';
export interface Props {
	navigation: any;
	//State
	selected: Array<boolean>;
	adImages: Array<any>,
	//Functions
	selectPhoto: Function,
	removeAdImages: Function,
	adImageIsLoading: Function,
}
export interface State {}
class DeletePhotosPageContainer extends React.Component<Props, State> {
	render() {
			return (
				<DeletePhotosPage
					navigation={this.props.navigation}
					selected={this.props.selected}
					adImages={this.props.adImages}
					selectPhoto={this.props.selectPhoto}
					removeAdImages={this.props.removeAdImages}
					adImageIsLoading={this.props.adImageIsLoading}
				/>
			);
	}
}

function bindAction(dispatch) {
	return {
		selectPhoto: index => dispatch( selectPhoto(index)),
		deletePhotos: originalPhotos => dispatch( deletePhotos(originalPhotos)),
		removeAdImages: selected => dispatch( removeAdImages(selected)),
		adImageIsLoading: bool => dispatch( adImageIsLoading(bool)),
	};
}

const mapStateToProps = state => ({
	 selected: state.deletePhotosReducer.selected,
	 adImages: state.editAdReducer.adImages,
});

export default connect(mapStateToProps, bindAction)(DeletePhotosPageContainer);
