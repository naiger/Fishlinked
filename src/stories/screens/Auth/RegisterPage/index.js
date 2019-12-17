import styles from "../styles";
import { Body, Button, Container, Content, Icon, Text, View, Item, Input, Spinner } from "native-base";
import {Image} from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//state
	emailValid: boolean,
	PWValid: boolean,
	confirmPWValid: boolean,
	isRegistering: boolean,
	registerErrorMessage: Object,
	confirmPW: string,
	//Functions
	setEmail: Funciton,
	setPassword: Function,
	setConfirmPassword: Function,
	emailValidation: Function,
	passwordValidation: Function,
	confirmPassword: Function,
	allValid: Function,
	register: Function,
}
export interface State {}
class RegisterPage extends React.Component<Props, State> {
	render() {
		return (
			<Container>
			<Image style={styles.shadow} source={require("../../../../../assets/images/startscreen_background.png")}/>
			<Content>
				<View style={styles.content}>
					<View style={styles.leftTop}>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</View>
					<Text style={styles.title2}>Sign Up</Text>
					<View style={styles.formBox}>
						<Item error={this.props.emailValid ? null : true}>
							<Icon style={styles.iconLight} active name="mail"/>
							<Input placeholder="Email" onChangeText={(text) => {
								this.props.setEmail(text);
								this.props.emailValidation(text);
							}}/>
						</Item>
						<Item error={this.props.PWValid ? null : true}>
							<Icon style={styles.iconLight} active name="unlock"/>
							<Input placeholder="Password" secureTextEntry={true}
								onChangeText={(text) => {
									this.props.setPassword(text);
									this.props.passwordValidation(text);
							}}/>
						</Item>
						<Item error={this.props.confirmPWValid ? null : true}>
							{
								this.props.confirmPWValid && this.props.confirmPW.length > 0
								? <Icon style={styles.iconLight} active name="checkmark-circle"/>
								: <Icon style={styles.iconLight} name="checkmark-circle"/>
							}
							<Input placeholder="Confirm Password" secureTextEntry={true}
								onChangeText={(text) => {
									this.props.setConfirmPassword(text);
									this.props.confirmPassword(text);
							}}/>
						</Item>
					</View>
					<View style={styles.buttonBox2}>
					{
						this.props.allValid()
						? (<Button block light onPress={() => this.props.register()}>
							{
								this.props.isRegistering
								? <Spinner color="grey"/>
								: <Text>Sign Up</Text>
							}
							</Button>)
						: <Button block disabled><Text>Sign Up</Text></Button>
					}
					</View>
					</View>
					</Content>
			</Container>
		);
	}
}

export default RegisterPage;
