import CreditCardPage from "../../../../stories/screens/Market/SellerPage/CreditCardPage";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text, Spinner} from "native-base";
import * as React from "react";
import {connect} from "react-redux";
import {Alert} from "react-native";
import {addCreditCard, creditCardOnChange, saveCardToken, getTokenByCard, cleanCardToken} from './actions';
export interface Props {
	navigation: any,
	//State
	formData: Object,
	creditCard: Object,
	isGetting: boolean,
	cardToken: string,
	cardError: Object,
	//Functions
	creditCardOnChange: Function,
	addCreditCard: Funciton,
	saveCardToken: Function,
	getTokenByCard: Function,
	cleanCardToken: Function,
}
export interface State {}

class CreditCardPageContainer extends React.Component<Props, State> {

	validCard = () =>{
		this.props.addCreditCard(this.props.formData.valid);
		this.props.formData.valid
		? this.getCardToken()
		: Alert.alert(
			"Invalid information",
			"Your your credit card information is not valid, please check!",
			[
				{text: "OK", style:"cancel"},
			],
		)
	}

	getCardToken = () => {
		const card = this.props.formData.values;
		const expiry = card.expiry.split('/');
		var params = {
	 		'card[number]': card.number.replace(/\s/g,""),
      'card[exp_month]': expiry[0],
      'card[exp_year]': expiry[1],
      'card[cvc]': card.cvc,
		};
		this.props.getTokenByCard(params);
	}
	render() {
		return (
			<CreditCardPage
				navigation={this.props.navigation}
				creditCardOnChange={this.props.creditCardOnChange}
				validCard={this.validCard}
				isGetting={this.props.isGetting}
				cardToken={this.props.cardToken}
				cardError={this.props.cardError}
			/>
		);
	}
}
function bindAction(dispatch) {
	return {
		creditCardOnChange: formData => dispatch( creditCardOnChange(formData)),
		addCreditCard: valid => dispatch( addCreditCard(valid)),
		saveCardToken: token => dispatch( saveCardToken(token)),
		getTokenByCard: card => dispatch( getTokenByCard(card)),
	}
}
const mapStateToProps = state => ({
	formData: state.creditReducer.formData,
	creditCard: state.creditReducer.creditCard,
	isGetting: state.creditReducer.isGetting,
	cardToken: state.creditReducer.cardToken,
	cardError: state.creditReducer.cardError,
});

export default connect(mapStateToProps, bindAction)(CreditCardPageContainer);
