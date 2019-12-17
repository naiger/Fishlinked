import Expo from 'expo';
import Login from "../../../stories/screens/Auth/Login";
import styles from "../styles";
import { Body, Button, Form, Header, Icon, Input, Item, Left, Right, Toast, Spinner } from "native-base";
// @flow
import * as React from "react";
import { reduxForm, Field, handleSubmit, reset } from "redux-form";
import {login, loginClick} from './actions';
import {Alert, PushNotificationIOS} from "react-native";
import {connect} from "react-redux";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export interface Props {
  navigation: any,
  //State
  userIsValid: boolean,
  loginError: boolean,
  isLoging: boolean,
  nickname: string,
  valid: boolean,
  loginClicked: boolean,
  sheet: any,
  //Functions
  login: Function,
  loginClick: Function,
}
export interface State {}
class LoginForm extends React.Component<Props, State> {

  textInput: any;
  renderInput({ input, label, type, meta: { touched, error, warning }}) {
    return (
      <Item error={error && touched}>
        <Icon style={styles.iconLight} active name={input.name === "username" ? "person" : "unlock"} />
        <Input
          ref={c => (this.textInput = c)}
          placeholder={input.name === "username" ? "Username" : "Password"}
          secureTextEntry={input.name === "password" ? true : false}
          {...input}
        />
      </Item>
    );
  }

  login() {
    //if (this.props.valid) {
      let values = this.props.sheet.login.values;
      this.props.login(values);
    //} else if (this.props.loginError){
    //   Toast.show({
    //     text: "Enter Valid Username and Password!",
    //     duration: 2000,
    //     position: "bottom",
    //     textStyle: { textAlign: "center" }
    //   });
    // }
  }
  // getToken = async () => {
	//   const { status: existingStatus } = await Expo.Permissions.getAsync(
	//     Expo.Permissions.NOTIFICATIONS
	//   );
	//   let finalStatus = existingStatus;
  //
	//   if (existingStatus !== 'granted') {
	//     const { status } = await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS);
	//     finalStatus = status;
	//   }
	//   if (finalStatus !== 'granted') return null;
	//   const token = await Expo.Notifications.getExpoPushTokenAsync();
  //   console.log(token);
	//   return token;
	// }

  conponentDidMount(){
    this.props.loginClick(false);
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    const param = this.props.navigation.state.params;
    // if(this.props.loginClicked){
    //   if(!nextProps.isLoging){
    // 		if(nextProps.userIsValid){
    //       if (!nextProps.isUserInfoLoading){
    //         param.to
    //         ? nextProps.navigation.navigate(param.to)
    //   			: nextProps.navigation.navigate("Main")
    //         Toast.show({
    //           text: "Welcome back "+this.props.nickname,
    //           position: "top",
    //           textStyle: { textAlign: "center" }
    //         });
    //       }
    // 		}
    // 		else {
    // 			Toast.show({
    //         text: "Invalid Username and Password!",
    //         duration: 2000,
    //         position: "bottom",
    //         textStyle: { textAlign: "center" }
    //       });
    // 		}
    //   }
    // }
    if(nextProps.loginClicked){
      if (!nextProps.isUserInfoLoading){
        param.to
        ? nextProps.navigation.navigate(param.to)
  			: nextProps.navigation.navigate("Main")
        Toast.show({
          text: "Welcome back "+this.props.nickname,
          position: "top",
          textStyle: { textAlign: "center" }
        });
      }
  		if (nextProps.loginError!=null) {
  			Toast.show({
          text: "Invalid Username and Password!",
          duration: 2000,
          position: "bottom",
          textStyle: { textAlign: "center" }
        });
  		}
    }
	}
  render(){
    const form = (
      <Form style={styles.formBox}>
        <Field
          name="username"
          component={this.renderInput}
          validate={[email, required]}
        />
        <Field
          name="password"
          component={this.renderInput}
          validate={[alphaNumeric, minLength8, required]}
        />
      </Form>
    );
    return (
      <Login
        navigation={this.props.navigation}
        loginForm={form}
        onLogin={()=>this.login()}
        onSubmit={this.props.handleSubmit}
        loginClick={this.props.loginClick}
        isUserInfoLoading={this.props.isUserInfoLoading}
        loginClicked={this.props.loginClicked}
      />
    );
  }
}

const LoginContainer = reduxForm({
  form: "login"
})(LoginForm);

bindAction = (dispatch) => {
	return {
    login: values => dispatch( login(values)),
    loginClick: bool => dispatch( loginClick(bool)),
  };
}

const mapStateToProps = state => ({
	nickname: state.loginReducer.nickname,
  loginError: state.loginReducer.loginError,
  userIsValid: state.loginReducer.userIsValid,
  isLoging: state.loginReducer.isLoging,
  loginClicked: state.loginReducer.loginClicked,
  isUserInfoLoading: state.loginReducer.isUserInfoLoading,
  sheet: state.form,
});

export default connect(mapStateToProps, bindAction)(LoginContainer);
