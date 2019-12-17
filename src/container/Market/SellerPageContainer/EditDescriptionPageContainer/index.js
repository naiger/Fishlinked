import EditDescriptionPage from "../../../../stories/screens/Market/SellerPage/EditDescriptionPage";
// @flow
import {Body, Header, Left, Right, Title, Button, Icont, Icon, Text} from "native-base";
import * as React from "react";
import {connect} from "react-redux";
import {updateAd} from '../MyAdsListPageContainer/actions';
import {initialProductName, updateProductName, updateProductDescription, descriptionValidate} from './actions';
export interface Props {
	navigation: any,
	//State
	name: string,
	description: string,
	currentUser: Object,
	media: Array<number>,
	nameValidation: string,
	descriptionValidation: string,
	//Funcitons
	updateAd: Fucntion,
	updateProductName: Function,
	updateProductDescription: Function,
	descriptionValidate: Function,
}
export interface State {}

class EditDescriptionPageContainer extends React.Component<Props, State> {
	textValidation = (text: string, field: string) =>{
		text
		? /[^a-zA-Z0-9 ]/i.test(text)
		  ? this.props.descriptionValidate(" Only alphanumeric characters", field)
		  : this.props.descriptionValidate(undefined, field)
		: this.props.descriptionValidate(" Required", field)
	}
	render() {
		return (
			<EditDescriptionPage
				navigation={this.props.navigation}
				name={this.props.name}
				description={this.props.description}
				media={this.props.media}
				nameValidation={this.props.nameValidation}
				descriptionValidation={this.props.descriptionValidation}
				updateProductName={this.props.updateProductName}
				updateProductDescription={this.props.updateProductDescription}
				updateAd={this.props.updateAd}
				currentUser={this.props.currentUser.id}
				textValidation={this.textValidation}
			/>
		);
	}
}
function bindAction(dispatch) {
	return{
		initialProductName: name => dispatch( initialProductName(name)),
		updateProductName: name => dispatch( updateProductName(name)),
		updateProductDescription: description => dispatch( updateProductDescription(description)),
		updateAd: (values, userId, adId) => dispatch( updateAd(values, userId, adId)),
		descriptionValidate: (text, field) => dispatch(descriptionValidate(text, field)),

	};
}

const mapStateToProps = state => ({
	name: state.editDescReducer.name,
	description: state.editDescReducer.description,
	currentUser: state.loginReducer.currentUser,
	media: state.editAdReducer.media,
	nameValidation: state.editDescReducer.nameValidation,
	descriptionValidation: state.editDescReducer.descriptionValidation,
});

export default connect(mapStateToProps, bindAction)(EditDescriptionPageContainer);
