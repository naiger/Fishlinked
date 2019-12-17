// @flow
import {Toast} from 'native-base';
import * as React from "react";
import ForgetPWPage from "../../../stories/screens/Auth/ForgetPWPage";
import {connect} from "react-redux";
import {sendForgetEmail, setForgetEmail, forgetEmailValidate} from './actions';

export interface Props {
	navigation: any,
	//state
	isSending: boolean,
	sendingResult: string,
	forgetEmailValid: boolean,
	forgetEmail: string,
	//Functions
	sendForgetEmail: Function,
	forgetEmailValidate: Function,
	setForgetEmail: Function,
}
export interface State {}
class ForgetPWPageContainer extends React.Component<Props, State> {
	notify = (info: string, time?: number) => (
		Toast.show({
			text: info,
			duration: time,
			position: "bottom",
			textStyle: { textAlign: "center" }
		})
	)
	emailValidation = (text) =>{
		text
		? !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)
	    ? (this.notify("Invalid email address", 0),
				this.props.forgetEmailValidate(false))
	    : (this.notify("", 1),
				this.props.forgetEmailValidate(true))
		: (this.notify("Email address is required", 0),
			this.props.forgetEmailValidate(false))
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		!nextProps.isSending
	  ? nextProps.sendingResult != ""
			? this.notify(nextProps.sendingResult, 5000)
			: null
		: null
	}
	render() {
		return (
			<ForgetPWPage
				navigation={this.props.navigation}
				isSending={this.props.isSending}
				forgetEmailValid={this.props.forgetEmailValid}
				sendForgetEmail={this.props.sendForgetEmail}
				emailValidation={this.emailValidation}
				forgetEmail={this.props.forgetEmail}
				setForgetEmail={this.props.setForgetEmail}
			/>
		);
	}
}
bindAction = (dispatch) => {
	return {
    sendForgetEmail: userInfo => dispatch(sendForgetEmail(userInfo)),
		setForgetEmail: email => dispatch(setForgetEmail(email)),
		forgetEmailValidate: bool => dispatch( forgetEmailValidate(bool)),
  };
}

const mapStateToProps = state => ({
	isSending: state.forgetReducer.isSending,
	sendingResult: state.forgetReducer.sendingResult,
	forgetEmailValid: state.forgetReducer.forgetEmailValid,
	forgetEmail: state.forgetReducer.forgetEmail,
});

export default connect(mapStateToProps, bindAction)(ForgetPWPageContainer)
