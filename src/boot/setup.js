// @flow
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import configureStore from "./configureStore";
import * as Expo from "expo";
import { StyleProvider } from "native-base";
import * as React from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import {SafeAreaView} from "react-navigation";
import { Provider } from "react-redux";
import axios from "axios";

export interface Props {}
export interface State {
	store: Object,
	isLoading: boolean,
	isReady: boolean,
}

export default class Setup extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			store: configureStore(() => this.setState({ isLoading: false })),
			isReady: false,
		};
	}
	componentDidMount() {
		this.loadFonts();
		axios.defaults.baseURL = "https://fishlinked.sk8tech.io";
		this.notificationSubscription = Expo.Notifications.addListener(this.handleNotification);
	}

	handleNotification = (notification) =>{
		this.setState({notification: notification});
		console.log("notification handler");
		console.log(notification);
	}

	async loadFonts() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		});

		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady || this.state.isLoading) {
			return <Expo.AppLoading />;
		}

		const app = (<App />);
		const appWithStore = (
			<Provider store={this.state.store}>
				{app}
			</Provider>
		);
		const appWithStyleAndStore = (
			<StyleProvider style={getTheme(variables)}>
				{appWithStore}
			</StyleProvider>
		);
		return appWithStyleAndStore;
		// if (isIphoneX()) {
		// 	return (
		// 			<SafeAreaView
		// 				style={{flex: 1, backgroundColor: "#ddd"}}
		// 				forceInset={{ bottom: "never"}}
		// 			>
		// 				{appWithStyleAndStore}
		// 			</SafeAreaView>
		// 		);
		// } else {
		// 	return (appWithStyleAndStore);
		// }
	}
}
export const getNotification = async () => {
  try {
    const notification = await AsyncStorage.getItem("@notification");
    return JSON.parse(notification);
  } catch (error) {
    console.log(error);
  }
};
