// @flow
import {Toast} from 'native-base';
import * as React from "react";
import RegisterPage from "../../../stories/screens/Auth/RegisterPage";
import {connect} from "react-redux";
import {setEmail, setPassword, setConfirmPassword, emailValidate, passwordValidate, confirmPasswordValidate, newUserRegister, registerError} from './actions';

export interface Props {
	navigation: any,
	//State
	registerEmail: string,
	registerPW: string,
	confirmPW: string,
	emailValid: boolean,
	PWValid: boolean,
	confirmPWValid: boolean,
	isRegistered: boolean,
	isRegistering: boolean,
	registerErrorMessage: Object,
	//Functions
	setEmail: Funciton,
	setPassword: Function,
	setConfirmPassword: Function,
	emailValidate: Function,
	passwordValidate: Function,
	confirmPasswordValidate: Function,
	newUserRegister: Function,
	registerError: Function,
}
export interface State {}
class RegisterPageContainer extends React.Component<Props, State> {
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
				this.props.emailValidate(false))
	    : (this.notify("", 1),
				this.props.emailValidate(true))
		: (this.notify("Email is required", 0),
			this.props.emailValidate(false))
	}
	passwordValidation = (text) =>{
		text
		?	/^(?=.*[a-zA-Z])(?=.*[\d])/i.test(text)
			? text.length > 7
			  ? (this.notify("", 1),
					this.props.passwordValidate(true))
				: (this.notify("Password must be at least 8 characters", 0),
					this.props.passwordValidate(false))
			:	(this.notify("Password must centain at least one alphabet letter and one number", 0),
				this.props.passwordValidate(false))
		: (this.notify("Password is required", 0),
			this.props.passwordValidate(false))
	}
	confirmPassword = (text) => {
		text
		? text === this.props.registerPW
			? (this.notify("", 1),
				this.props.confirmPasswordValidate(true))
			: (this.notify("Password does not match the confirm password", 0),
				this.props.confirmPasswordValidate(false))
		: (this.notify("Password confirmation is required", 0),
			this.props.confirmPasswordValidate(false))
	}
	register = () => {
		this.props.newUserRegister(this.props.registerEmail, this.props.registerPW);
	}
	allValid = () => {
		let result = false;
		this.props.emailValid
		&& this.props.PWValid
		&& this.props.confirmPWValid
		&& this.props.registerEmail.length > 0
		&& this.props.registerPW.length > 0
		&& this.props.confirmPW.length > 0
		? result = true
		: result = false
		return result;
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		nextProps.isRegistered
		? this.props.navigation.navigate("LoginPage", {from:"LaunchPage", to:"Main"})
		: this.allValid()
		  ? nextProps.registerErrorMessage != ""
				? this.notify(nextProps.registerErrorMessage, 2000)
				: null
			: this.props.registerError("")
	}
	render() {
		return (
			<RegisterPage
				navigation={this.props.navigation}
				setEmail={this.props.setEmail}
				setPassword={this.props.setPassword}
				setConfirmPassword={this.props.setConfirmPassword}
				emailValidation={this.emailValidation}
				passwordValidation={this.passwordValidation}
				confirmPassword={this.confirmPassword}
				emailValid={this.props.emailValid}
				PWValid={this.props.PWValid}
				confirmPWValid={this.props.confirmPWValid}
				isRegistered={this.props.isRegistered}
				isRegistering={this.props.isRegistering}
				registerErrorMessage={this.props.registerErrorMessage}
				allValid={this.allValid}
				confirmPW={this.props.confirmPW}
				register={this.register}
			/>
		);
	}
}
bindAction = (dispatch) => {
	return {
    setEmail: email => dispatch(setEmail(email)),
		setPassword: password => dispatch( setPassword(password)),
		setConfirmPassword: password => dispatch( setConfirmPassword(password)),
		emailValidate: bool => dispatch( emailValidate(bool)),
		passwordValidate: bool => dispatch( passwordValidate(bool)),
		confirmPasswordValidate: bool => dispatch(confirmPasswordValidate(bool)),
		newUserRegister: (email, password) => dispatch( newUserRegister(email, password)),
		registerError: error => dispatch(registerError(error)),
  };
}

const mapStateToProps = state => ({
	registerEmail: state.registerReducer.registerEmail,
	registerPW: state.registerReducer.registerPW,
	confirmPW: state.registerReducer.confirmPW,
	emailValid: state.registerReducer.emailValid,
	PWValid: state.registerReducer.PWValid,
	confirmPWValid: state.registerReducer.confirmPWValid,
	isRegistered: state.registerReducer.isRegistered,
	isRegistering: state.registerReducer.isRegistering,
	registerErrorMessage: state.registerReducer.registerErrorMessage,
});

export default connect(mapStateToProps, bindAction)(RegisterPageContainer);
