import styles from "./styles";
import { Button, Container, Content, Icon, Title, ActionSheet, Input, List, ListItem, Picker, Form, Left, Header, Body, Right, Text, Spinner} from "native-base";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//State
	creditCard: Object;
	paid: boolean,
	isProcessing: boolean,
	paymentErrorMessage: string,
	currentUser: Object,
	//Functions
	generateAd: Function,
	activeNewAd: Function,
}
export interface State {}
class CardInfoPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>Confirmation</Title>
					</Body>
					<Right>
						<Button transparent onPress = {()=> this.props.generateAd()}>
							<Text>Pay</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					{
						this.props.isProcessing
						? <Spinner color="grey"/>
						: this.props.paid
							? (this.props.navigation.navigate("MyAdsList"),
								this.props.activeNewAd(this.props.paid, this.props.currentUser.id))
							: this.props.paymentErrorMessage != ""
								? alert(this.props.paymentErrorMessage.message)
								: null
					}
					<List>
						<ListItem itemDivider>
							<Title>Card Number</Title>
						</ListItem>
						<ListItem>
							<Text style={styles.info}>{this.props.creditCard.number}</Text>
						</ListItem>
						<ListItem itemDivider>
							<Title>Card Holder</Title>
						</ListItem>
						<ListItem>
							<Text style={styles.info}>{this.props.creditCard.name}</Text>
						</ListItem>
						<ListItem itemDivider>
							<Title>Expiry Date</Title>
						</ListItem>
						<ListItem>
							<Text style={styles.info}>{this.props.creditCard.expiry}</Text>
						</ListItem>
						<ListItem itemDivider>
							<Title>CVV</Title>
						</ListItem>
						<ListItem>
							<Text style={styles.info}>{this.props.creditCard.cvc}</Text>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

export default CardInfoPage;
