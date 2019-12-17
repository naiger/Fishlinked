import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from "native-base";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
}
export interface State {}
class SamplePage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Content padder>
					<Text>{param !== undefined ? param.name.item : "Create Something Awesome . . ."}</Text>
				</Content>
			</Container>
		);
	}
}

export default SamplePage;
