import AuthNavigator from "./container/Auth/index";
import SamplePage from "./container/SamplePageContainer";
import MainTab from "./container/MainTab";
import { Root } from "native-base";
// @flow
import React from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

const App = createSwitchNavigator(
	{
    Auth: { screen: AuthNavigator, },
		Main: { screen: MainTab, },
		SamplePage: { screen: SamplePage },
	},
	{
		initialRouteName: "Auth",
		headerMode: "none",
	},
);

export default () => (
		<Root>
			<App />
		</Root>
);
