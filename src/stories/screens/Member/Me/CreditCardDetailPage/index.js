import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,Card, CardItem, View} from "native-base";
import { CreditCardInput} from "react-native-credit-card-input";
// @flow
import { Alert } from "react-native";
import * as React from "react";
export interface Props {
	navigation: any;
	//State
	//Functions
	getNewCardInfo: Function,
	saveNewCard: Function,
}
export interface State {}

class CreditCardDetailPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={()=>{this.props.navigation.navigate("MePage")}} >
							<Icon name ="arrow-back" style={{color:'blue'}} />
						</Button>
					</Left>
					<Body><Title>Card Info</Title></Body>
					<Right>
						<Button transparent onPress={() => {
							Alert.alert(
								"Confirmation",
								"Is all your ard information correct?",
								[
									{text: "Yes & Save", onPress:() => {
										this.props.saveNewCard();
									}},
									{text: "Cancel", style:"cancel"},
								],
							)}}>
							<Text style={{color:'blue'}} >Save</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={styles.card}>
						<CreditCardInput
							autoFocus

							requiresName
							requiresCVC

							labelStyle={styles.label}
							inputStyle={styles.input}
							validColor={"black"}
							invalidColor={"red"}

							onChange={this.props.getNewCardInfo} />
					</View>
				</Content>
			</Container>
		);
	}
}

export default CreditCardDetailPage;
