import EditPricePage from "../../../../stories/screens/Market/SellerPage/EditPricePage";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import * as React from "react";
import {connect} from "react-redux";
import {pickCurrency, pickUnit, priceValidate, commentsValidate, updateProductPrice, updateProductComments, createOrder} from './actions';
export interface Props {
	navigation: any,
	//State
	currency: string,
	unit: string,
	price: number,
	priceValidation: string,
	commentsValidation: string,
	comments: string,
	//Functions
	updateProductPrice: Function,
	updateProductComments: Function,
	priceValidate: Function,
	commentsValidate: Function,
	createOrder: Function,
}
export interface State {}

class EditPricePageContainer extends React.Component<Props, State> {
	numberValidation = (number: string) =>{
		number
		? /[^0-9 ]/i.test(number)
			? this.props.priceValidate(" Only number")
			: parseInt(number) <= 0
				? this.props.priceValidate(" Must be a positive integer")
				: this.props.priceValidate(undefined)
		: this.props.priceValidate(" Required")
	}
	textValidation = (text: string) =>{
		/[^a-zA-Z0-9 \n\.\,]/i.test(text)
		? this.props.commentsValidate(" Only alphanumeric characters")
		: this.props.commentsValidate(undefined)
	}
	componentDidMount(){
		this.props.updateProductPrice(0);
		this.props.priceValidate(undefined);
		this.props.commentsValidate(undefined);
	}
	render() {
		return (
			<EditPricePage
				navigation={this.props.navigation}
				currency={this.props.currency}
				unit={this.props.unit}
				updateProductPrice={this.props.updateProductPrice}
				updateProductComments={this.props.updateProductComments}
				price={this.props.price}
				comments={this.props.comments}
				priceValidation={this.props.priceValidation}
				commentsValidation={this.props.commentsValidation}
				numberValidation={this.numberValidation}
				textValidation={this.textValidation}
				createOrder={this.props.createOrder}
			/>
		);
	}
}
function bindAction(dispatch) {
	return {
		updateProductPrice: price => dispatch( updateProductPrice(price)),
		updateProductComments: comments => dispatch (updateProductComments(comments)),
		priceValidate: number => dispatch( priceValidate(number)),
		commentsValidate: text => dispatch( commentsValidate(text)),
		createOrder: productId => dispatch( createOrder(productId)),
	};
}

const mapStateToProps = state => ({
	currency: state.editPriceReducer.currency,
	unit: state.editPriceReducer.unit,
	price: state.editPriceReducer.price,
	comments: state.editPriceReducer.comments,
	priceValidation: state.editPriceReducer.priceValidation,
	commentsValidation: state.editPriceReducer.commentsValidation,
});

export default connect(mapStateToProps, bindAction)(EditPricePageContainer);
