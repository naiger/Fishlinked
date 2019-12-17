import SamplePage from "../../stories/screens/SamplePage";
// @flow
import {Body, Header, Left, Right, Title} from 'native-base';
import * as React from "react";

export interface Props {
	navigation: any,
}
export interface State {}
export default class SamplePageContainer extends React.Component<Props, State> {
	static navigationOptions = ({ navigation }) => ({
		header: (
				<Header>
					<Left/>
					<Body>
						<Title>Blank Page</Title>
					</Body>
					<Right/>
				</Header>
			)
	});
	render() {
		return <SamplePage navigation={this.props.navigation} />;
	}
}
