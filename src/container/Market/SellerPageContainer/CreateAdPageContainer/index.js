import CreateAdPage from "../../../../stories/screens/Market/SellerPage/CreateAdPage";
import {initialAdImages} from '../EditAdPageContainer/actions';
import {initialProductName, initialProductDescription} from '../EditDescriptionPageContainer/actions';
import {createNewAd} from '../MyAdsListPageContainer/actions';
import { fetchCategories, setCategory } from "./actions";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon} from "native-base";
import {Text, Alert} from "react-native";
import * as React from "react";
import {connect} from "react-redux";
export interface Props {
	navigation: any,
	//State
	categoriesIsLoading: boolean,
	categories: Array<Object>,
	categoriesError: Object,
	adPeriod: number,
	name: string,
	description: string,
	price: number,
	media: Array<number>,
	currentUser: Object,
	productCategory: number,
	comments: string,
	//Functions
	fetchCategories: Function,
	initialAdImages: Function;
	initialProductName: Function,
	initialProductDescription: Function,
	setCategory: Function,
	createNewAd: Function,
}
export interface State {}

class CreateAdPageContainer extends React.Component<Props, State> {
	componentDidMount() {
		this.props.fetchCategories({
			parent: 31,
		});
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
			<CreateAdPage
				navigation={this.props.navigation}
				categories={this.props.categories}
				initialAdImages={this.props.initialAdImages}
				initialProductName={this.props.initialProductName}
				initialProductDescription={this.props.initialProductDescription}
				setCategory={this.props.setCategory}
				generateNewDraft={this.generateNewDraft}
			/>
		);
	}
}
function bindAction(dispatch) {
	return {
		fetchCategories: options => dispatch( fetchCategories(options)),
		initialAdImages: images => dispatch( initialAdImages(images)),
		initialProductName: name => dispatch( initialProductName(name)),
		initialProductDescription: description => dispatch( initialProductDescription(description)),
		setCategory: category => dispatch( setCategory(category) ),
		createNewAd: (ad, userId) => dispatch( createNewAd(ad, userId)),
	};
}

const mapStateToProps = state => ({
	categories: state.newAdReducer.categories,
	categoriesIsLoading: state.newAdReducer.categoriesIsLoading,
	categoriesError: state.newAdReducer.categoriesError,
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

export default connect(mapStateToProps, bindAction)(CreateAdPageContainer);
