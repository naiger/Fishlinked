import PaymentPage from "../../../../stories/screens/Market/SellerPage/PaymentPage";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import {Alert} from "react-native";
import * as React from "react";
import {connect} from "react-redux";
import {createNewAd} from '../MyAdsListPageContainer/actions';
import {initialAdPackage, setPaymentMethod} from "./actions";
export interface Props {
	navigation: any,
	//State
	adFee: number,
	adPeriod: number,
	name: string,
	description: string,
	price: number,
	media: Array<number>,
	currentUser: Object,
	productCategory: number,
	comments: string,
	//Functions
	initialAdPackage: Function,
	setPaymentMethod: Function,
}
export interface State {}

class PaymentPageContainer extends React.Component<Props, State> {
	componentDidMount() {
		this.props.initialAdPackage(this.props.navigation.state.params.price, this.props.navigation.state.params.days);
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
			<PaymentPage
				navigation={this.props.navigation}
				adFee={this.props.adFee}
				adPeriod={this.props.adPeriod}
				setPaymentMethod={this.props.setPaymentMethod}
				generateNewDraft={this.generateNewDraft}
			/>
		);
	}
}
function bindAction(dispatch) {
	return {
		initialAdPackage: (adFee, adPeriod) => dispatch( initialAdPackage(adFee, adPeriod)),
		setPaymentMethod: method => dispatch( setPaymentMethod(method)),
		createNewAd: (ad, userId) => dispatch( createNewAd(ad, userId)),
	};
}

const mapStateToProps = state => ({
	adFee: state.paymentReducer.adFee,
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

export default connect(mapStateToProps, bindAction)(PaymentPageContainer);
