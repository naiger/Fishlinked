import CardInfoPage from "../../../../stories/screens/Market/SellerPage/CardInfoPage";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import * as React from "react";
import {connect} from "react-redux";
import {Alert} from "react-native";
import {createNewAd, activeNewAd} from '../MyAdsListPageContainer/actions';
import {payForAd} from './actions';
export interface Props {
	navigation: any,
	//state
	creditCard: Object,
	name: string,
	description: string,
	price: number,
	media: Array<number>,
	currentUser: Object,
	productCategory: number,
	comments: string,
	adPeriod: number,
	orderId: number,
	cardToken: string,
	paid: boolean,
	isProcessing: boolean,
	paymentErrorMessage: string,
	//Functions
	createNewAd: Functon,
	payForAd: Function,
	activeNewAd: Function,
}
export interface State {}

class CardInfoPageContainer extends React.Component<Props, State> {

	generateAd = () =>{
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
		console.log(this.props.cardToken);
		return (
			Alert.alert(
				"Confirmation",
				"Please confirm your card detail before you pay.",
				[
					{text: "Cancel", style:"cancel"},
					{text: "Confirm", onPress: () => {
						console.log(this.props.currentUser.id);
						this.props.payForAd(this.props.orderId, this.props.cardToken);
						this.props.createNewAd(ad, this.props.currentUser.id);
					}},
				],
			)
		);
	}
	render() {
		return (
			<CardInfoPage
				navigation={this.props.navigation}
				creditCard={this.props.creditCard}
				generateAd={this.generateAd}
				paid={this.props.paid}
				isProcessing={this.props.isProcessing}
				paymentErrorMessage={this.props.paymentErrorMessage}
				currentUser={this.props.currentUser}
				activeNewAd={this.props.activeNewAd}
			/>
		);
	}
}
function bindAction(dispatch) {
	return{
		createNewAd: (ad, userId) => dispatch( createNewAd(ad, userId)),
		payForAd: (orderId, cardToken) => dispatch( payForAd(orderId, cardToken)),
		activeNewAd: (paid, userId) => dispatch( activeNewAd(paid, userId)),
	};
}

const mapStateToProps = state => ({
	currentUser: state.loginReducer.currentUser,
	creditCard: state.creditReducer.creditCard,
	media: state.editAdReducer.media,
	name: state.editDescReducer.name,
	description: state.editDescReducer.description,
	currency: state.editPriceReducer.currency,
	unit: state.editPriceReducer.unit,
	price: state.editPriceReducer.price,
	comments: state.editPriceReducer.comments,
	productCategory: state.newAdReducer.productCategory,
	adPeriod: state.paymentReducer.adPeriod,
	orderId: state.editPriceReducer.orderId,
	cardToken: state.creditReducer.cardToken,
	paid: state.cardInfoReducer.paid,
	isProcessing: state.cardInfoReducer.isProcessing,
	paymentErrorMessage: state.cardInfoReducer.paymentErrorMessage
});

export default connect(mapStateToProps,bindAction)(CardInfoPageContainer);
