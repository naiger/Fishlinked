import styles from "../styles";
import { Button, Container, Content, Icon, Text, View, Item, Input, Spinner} from "native-base";
import {Image} from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any,
	//state
	isSending: boolean,
	sendingResult: string,
	forgetEmailValid: boolean,
	forgetEmail: string,
	//Functions
	sendForgetEmail: Function,
	emailValidation: Function,
	setForgetEmail: Function,
}
export interface State {}
class ForgetPWPage extends React.Component<Props, State> {
	render() {
		const info = "Please enter your username or email address. You will receive a link to create a new password via email.";
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
						<Text style={styles.title2}>Reset Password</Text>
						<View style={styles.formBox}>
								<Text style={styles.iconLight}>{info}</Text>
								<Item error={this.props.forgetEmailValid ? null : true}>
									<Icon style={styles.iconLight} active name="key"/>
									<Input
										placeholder="Username or Email address"
									  onChangeText={(text) => {
											this.props.emailValidation(text);
											this.props.setForgetEmail(text);
										}}/>
								</Item>
						</View>
						<View style={styles.buttonBox2}>
						{
							this.props.forgetEmail.length > 0 && this.props.forgetEmailValid
							? (<Button block light onPress={() => this.props.sendForgetEmail(this.props.forgetEmail)}>
									{
										this.props.isSending
										? <Spinner color="grey"/>
										: <Text>Reset Password</Text>
									}
								</Button>)
							: <Button block disabled><Text>Reset Password</Text></Button>
						}
						</View>
					</View>
				</Content>
			</Container>
		);
	}
}

export default ForgetPWPage;
