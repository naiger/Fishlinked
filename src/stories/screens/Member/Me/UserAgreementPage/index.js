import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,Card, CardItem,} from "native-base";
// @flow
import * as React from "react";
export interface Props {
	navigation: any;
}
export interface State {}

class UserAgreementPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={()=>{this.props.navigation.goBack()}} >
							<Icon name ="arrow-back" style={{color:'blue'}} />
						</Button>
					</Left>
					<Body><Title>Agreement</Title></Body>
					<Right/>
				</Header>
				<Content padder>
					<Text>End User License Agreement...</Text>
				</Content>
			</Container>
		);
	}
}

export default UserAgreementPage;
