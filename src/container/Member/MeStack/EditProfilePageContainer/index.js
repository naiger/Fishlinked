import EditProfilePage from "../../../../stories/screens/Member/Me/EditProfilePage";
// @flow
import {Body, Header, Left, Right, Title,Icon,Button,Text, Spinner, ListItem, View, Item, Label, Input} from "native-base";
import * as React from "react";
import {connect} from "react-redux";
import {Alert} from "react-native";
import {uploadAvatar} from '../actions';
import styles from './styles';

export interface Props {
	navigation: any,
	//state
	currentUser: Object,
	//Functions
	uploadAvatar: Function,
}
export interface State {}
class EditProfilePageContainer extends React.Component<Props, State> {

	render() {
		return (
			<EditProfilePage
				navigation={this.props.navigation}
				currentUser={this.props.currentUser}
				uploadAvatar={this.props.uploadAvatar}
			/>
		);
	}
}
bindAction = (dispatch) => {
	return {
		uploadAvatar: url => dispatch( uploadAvatar(url)),
	};
}

const mapStateToProps = state => ({
	currentUser: state.loginReducer.currentUser,
});

export default connect(mapStateToProps,bindAction)(EditProfilePageContainer);
