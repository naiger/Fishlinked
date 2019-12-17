import styles from "../styles";
import { Button, Container, Content, Form, Icon, Input, Item, Text, View, Spinner, Header, Left} from "native-base";
import * as React from "react";
import { Image, Modal } from "react-native";

export interface Props {
	navigation: any,
	//State
	loginForm: any,
	loginClicked: boolean,
	//Functions
	onLogin: Function,
	onSubmit: Function,
	loginClick: Function,
}
export interface State {}
class Login extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container>
			<Image style={styles.shadow} source={require("../../../../../assets/images/startscreen_background.png")}/>
			<Content>
				<View style={styles.content}>
					<View style={styles.leftTop}>
						<Button transparent onPress={() => {
							param.from
							? this.props.navigation.navigate(param.from)
							: this.props.navigation.goBack()
						}}>
							<Icon name="ios-arrow-back" />
						</Button>
					</View>
					<Text style={styles.title2}>Log In</Text>
					 {this.props.loginForm}
					<View style={styles.buttonBox2}>
						<Button block light onPress={() => {
							this.props.onSubmit;
							this.props.loginClick(true);
							this.props.onLogin();
						}}>
							<Text>Login</Text>
						</Button>
						<Button block light onPress={() => this.props.navigation.navigate("ForgetPWPage")}>
							<Text>Forget Password</Text>
						</Button>
					</View>
				</View>
			</Content>
			<Modal
				animationType="fade"
        transparent={true}
				visible={this.props.loginClicked}
			>
				<View style={styles.spinnerContainer}>
					<View style={styles.modalStyle}>
						<Spinner color="grey"/>
						<Text style={styles.loging}>Loging...</Text>
					</View>
				</View>
			</Modal>
			</Container>
		);
	}
}

export default Login;
