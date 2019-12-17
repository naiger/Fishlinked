import {Permissions, ImagePicker} from "expo";
import EditAdPage from "../../../../stories/screens/Market/SellerPage/EditAdPage";
import {createNewAd} from '../MyAdsListPageContainer/actions';
import { addAdImages, openImageBrowser, uploadImage, fetchAdImages, adImageIsLoading} from "./actions";
import { initIndex } from "../DeletePhotosPageContainer/actions";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import { Alert } from "react-native";
import * as React from "react";
import {connect} from "react-redux";
export interface Props {
	//state
	navigation: any,
	adImages: Array<any>,
	imagesRemoved: boolean,
	imageIsUploading: boolean,
	imageIsLoading: boolean,
	removedImages: number,
	imagesFetched: number,
	adPeriod: number,
	name: string,
	description: string,
	price: number,
	media: Array<number>,
	currentUser: Object,
	productCategory: number,
	comments: string,
	//Functions
	addAdImages: Function,
	initIndex: Function,
	openImageBrowser: Funciton,
	uploadImage: Function,
	adImageIsLoading: Function,
 	createNewAd: Function,
}
export interface State {}

class EditAdPageContainer extends React.Component<Props, State> {
	componentDidMount(){
		const param = this.props.navigation.state.params;
		if (!param.ad) {
			this.props.adImageIsLoading(false);
		}
		else {
			if (param.images.length > 0){
				param.images.map((image, i) =>this.props.fetchAdImages(image, i));
			}
			else this.props.adImageIsLoading(false);
		}
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		const param = this.props.navigation.state.params;
		! param.ad
		? this.props.adImageIsLoading(false)
		: this.props.removedImages === 0
			? param.images.length === nextProps.imagesFetched
				? nextProps.adImageIsLoading(false) : null
			: (param.images.length - nextProps.removedImages) === nextProps.adImages.length
				?	nextProps.adImageIsLoading(false) : null
	}
	generateNewDraft = () => {
		const fields = new Object();
		fields.description = this.props.description;
		fields.price = this.props.price;
		fields.images = this.props.media;
		fields.seller = this.props.currentUser.id;
		fields.comments = this.props.comments;
		fields.expire_date = this.props.adPeriod;
		const ad = new Object();
		ad.title = this.props.name;
		ad.fields = fields;
		ad.categories = this.props.productCategory;
		ad.featured_media = this.props.media[0];
		this.props.createNewAd(ad, this.props.currentUser.id);
	}
	render() {
		return (
			<EditAdPage
				navigation={this.props.navigation}
				adImages={this.props.adImages}
				addAdImages={this.props.addAdImages}
				initIndex={this.props.initIndex}
				imageIsUploading={this.props.imageIsUploading}
				imageIsLoading={this.props.imageIsLoading}
				imagesRemoved={this.props.imagesRemoved}
				removeTagReset={this.props.removeTagReset}
				openImageBrowser={this.props.openImageBrowser}
				generateNewDraft={this.generateNewDraft}
			/>
		);
	}
}
function bindAction(dispatch) {
	return {
		addAdImages: (image, index) => dispatch( addAdImages(image, index)),
		initIndex: length => dispatch( initIndex(length)),
		openImageBrowser: bool => dispatch( openImageBrowser(bool)),
		fetchAdImages: (image, index) => dispatch( fetchAdImages(image, index)),
		uploadImage: image => dispatch( uploadImage(image)),
		adImageIsLoading: bool => dispatch( adImageIsLoading(bool)),
		createNewAd: (ad, userId) => dispatch( createNewAd(ad, userId)),
	};
}

const mapStateToProps = state => ({
	adImages: state.editAdReducer.adImages,
	imagesRemoved: state.editAdReducer.imagesRemoved,
	imageBrowserOpen: state.editAdReducer.imageBrowserOpen,
	imageIsUploading: state.editAdReducer.imageIsUploading,
	imageIsLoading: state.editAdReducer.imageIsLoading,
	removedImages: state.editAdReducer.removedImages,
	imagesFetched: state.editAdReducer.imagesFetched,
	adPeriod: state.paymentReducer.adPeriod,
	currentUser: state.loginReducer.currentUser,
	media: state.editAdReducer.media,
	name: state.editDescReducer.name,
	description: state.editDescReducer.description,
	currency: state.editPriceReducer.currency,
	unit: state.editPriceReducer.unit,
	price: state.editPriceReducer.price,
	comments: state.editPriceReducer.comments,
	productCategory: state.newAdReducer.productCategory,
});

export default connect(mapStateToProps, bindAction)(EditAdPageContainer);
