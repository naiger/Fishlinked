import styles from "./styles";
import { Button, Container, Content, Icon, Text, ActionSheet, Input, Textarea, Title, List, ListItem, Picker, Form, Header, Left, Body, Right, Spinner} from "native-base";
import { Dimensions, Image, View } from "react-native";
import { CreditCardInput} from "react-native-credit-card-input";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//state
	isGetting: boolean,
	cardToken: string,
	cardError: Object,
	//Functions
	creditCardOnChange: Function,
	validCard: Function,
}
export interface State {}
class CreditCardPage extends React.Component<Props, State> {

  _onFocus = (field) => console.log("focusing", field);
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
						<Title>Add Card</Title>
					</Body>
					<Right>
						<Button transparent onPress = {()=> {
							this.props.validCard();
						}}>
							<Text>Next</Text>
						</Button>
					</Right>
				</Header>
				<View style={styles.card}>
				{
					this.props.isGetting
					? <Spinner color="grey"/>
					: this.props.cardToken.length > 0
						? this.props.navigation.navigate("CardInfo")
						: this.props.cardError != null
							? alert(this.props.cardError.error.message)
							: null
				}
				<CreditCardInput
						autoFocus

						requiresName
						requiresCVC

						labelStyle={styles.label}
						inputStyle={styles.input}
						validColor={"black"}
						invalidColor={"red"}

						onFocus={this._onFocus}
						onChange={this.props.creditCardOnChange} />
				</View>
			</Container>
		);
	}
}

export default CreditCardPage;
