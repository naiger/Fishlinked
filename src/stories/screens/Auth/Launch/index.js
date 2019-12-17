import styles from "../styles";
import { Button, Container, Content, View, Text, Header} from "native-base";
// @flow
import * as React from "react";
import { Image } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
export interface Props {
	navigation: any;
}
export interface State {}
class Launch extends React.Component<Props, State> {
	render() {
		return (
			<Container>
				{
					isIphoneX()
					? <Header/>
					: null
				}
				<Image style={styles.shadow} source={require("../../../../../assets/images/startscreen_background.png")}/>
				<Content padder>
				<View style={styles.content}>
					<Text style={styles.title}>Welcome</Text>
					<Text style={styles.subtitle}>You have Fishlinked!</Text>
					<View style={styles.buttonBox}>
						<Button block light onPress={() => this.props.navigation.navigate("RegisterPage")}>
							<Text>Become a Member</Text>
						</Button>
						<Button block light onPress={() => this.props.navigation.navigate("LoginPage",{from:"LaunchPage", to:"Main"})}>
							<Text>Log In</Text>
						</Button>
						<Button block light onPress={() => this.props.navigation.navigate("ListStack")}>
							<Text>Just Browse</Text>
						</Button>
					</View>
			 </View>
			 </Content>
			</Container>
		);
	}
}

export default Launch;
