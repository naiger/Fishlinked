import styles from "./styles";
import { Button, Container, Content, Icon, Text, ActionSheet, Input, Textarea, Title, List, ListItem, Left, Right, Card, CardItem, Body, H1, H2, H3, Header} from "native-base";
import { Alert, Image, View } from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//state
	adFee: number,
	adPeriod: number,
	//Functions
	setPaymentMethod: Function,
	generateNewDraft: Function,
}
export interface State {}
class PaymentPage extends React.Component<Props, State> {
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
						<Title>Payment</Title>
					</Body>
					<Right>
						<Button transparent onPress = {()=> {
							Alert.alert(
								"Alert",
								"You just tapped the cancel button. Would you like to save this draft?",
								[
									{text: "Save", onPress: () => {
										this.props.generateNewDraft();
										this.props.navigation.navigate("MyAdsList");
									}},
									{text: "Don't Save", onPress: () => this.props.navigation.navigate("MyAdsList")},
									{text: "Cancel", style:"cancel"},
								],
							)
						}}>
							<Icon name="close"/>
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={styles.cardContainer}>
						<View style={styles.card}>
							<View style={styles.cardHeader}>
								<Text>You have selected</Text>
							</View>
							<View style={styles.cardBody}>
								<H1 style={styles.price}>AUD {this.props.adFee}</H1>
								<H1 style={styles.price}>{this.props.adPeriod} Days Plan</H1>
							</View>
							<View style={styles.cardHeader}>
								<Text>How would you like to pay?</Text>
							</View>
						</View>
					</View>
					<ListItem itemDivider>
						<Text>Payment Methods</Text>
					</ListItem>
					<List>
						<ListItem onPress={()=>{
							Alert.alert(
								"Apply Pay not available",
								"Sorry for the inconvience, this payment method is not supported yet, please use Credit Card to complete your payment. Thank you",
								[
									{text: "Select another method", style:"cancel"},
								],
							)
						}}>
							<Left>
								<Text>Apple Pay</Text>
							</Left>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
						<ListItem onPress={()=> {
							this.props.setPaymentMethod("Credit Card");
							this.props.navigation.navigate("CreditCard")
						}}>
							<Left>
								<Text>Credit Card</Text>
							</Left>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

export default PaymentPage;
