// @flow
import * as React from "react";
import Launch from "../../../stories/screens/Auth/Launch";
export interface Props {
	navigation: any,
}
export interface State {}
export default class LaunchContainer extends React.Component<Props, State> {
	render() {
		return <Launch navigation={this.props.navigation} />;
	}
}
