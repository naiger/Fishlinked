import styles from "./styles";
import { Button, Container, Content, Icon, Text, ActionSheet, Input, Textarea, Title, List, ListItem, Picker, Form, Right, Header, Left, Body} from "native-base";
import { Dimensions, Image, View, Alert} from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//State
	currency: string,
	unit: string,
	price: number,
	comments: string,
	priceValidation: string,
	commentsValidation: string,
	//Functions
	updateProductPrice: Function,
	updateProductComments:Function,
	pickUnit: Function,
	pickCurrency: Function,
	numberValidation: Function,
	textValidation: Function,
	createOrder: Function,
}
export interface State {}
class EditPricePage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const deviceWidth = Dimensions.get("window").width;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>New Product</Title>
					</Body>
					<Right>
					{
						this.props.priceValidation === undefined
						&& this.props.commentsValidation === undefined
						&& this.props.price > 0
						? (
								<Button transparent onPress = {()=>
									Alert.alert(
										"Advertising Fee",
										"Please choose one of the following advertising schedules that suit your need.",
										[
											{text: "7 Days - AUD $9.99", onPress: () => {
												this.props.createOrder(18606);
												this.props.navigation.navigate("Payment",{days:7, price:"$9.99", currency:"AUD"});
											}},
											{text: "14 Days - AUD $19.99", onPress: () => this.props.navigation.navigate("Payment",{days:14, price:"$19.99", currency:"AUD"})},
											{text: "30 Days - AUD $29.99", onPress: () => this.props.navigation.navigate("Payment",{days:30, price:"$29.99", currency:"AUD"})},
											{text: "Cancel", style:"cancel"},
										],
										{cancelable: true}
									)
								}>
							 		<Text style={styles.enable}>Done</Text>
							  </Button>
							)
						: (<Button transparent onPress={()=>{
								this.props.numberValidation(this.props.price);
								this.props.textValidation(this.props.comments);
							}}>
								<Text style={styles.disabled}>Done</Text>
							</Button>)
					}
					</Right>
				</Header>
				<Content>
				<View style={styles.page}>
					<View style={styles.title}>
						<Title>Step 4 - Pricing</Title>
					</View>
					<View style={styles.name}>
						<Input
							placeholder="Enter Price"
							value={this.props.price > 0 ? this.props.price.toString() : ""}
							onChangeText={(price) => {
								this.props.updateProductPrice(price);
								this.props.numberValidation(price);
							}}
							onFocus={() => this.props.numberValidation(this.props.price)}
						/>
					</View>
					{
						this.props.priceValidation != undefined
						? (
							<View style={styles.errorMessage}>
								<Icon name="ios-information-circle" style={styles.errorInfo}/>
								<Text style={styles.error}>{this.props.priceValidation}</Text>
							</View>
						)
						: null
					}
					<View style={styles.separate}>
					</View>
				</View>
				<List>
					<ListItem itemDivider>
						<Text>Currency</Text>
					</ListItem>
					<ListItem  onPress={() => this.props.navigation.navigate("Picker",{options: "Currency"})}>
						<Left>
							<Text>{this.props.currency}</Text>
						</Left>
						<Right>
							<Icon name="arrow-forward" style={styles.picker}/>
						</Right>
					</ListItem>
					<ListItem itemDivider>
						<Text>Unit (Optional)</Text>
					</ListItem>
					<ListItem onPress={() => this.props.navigation.navigate("Picker",{options: "Unit"})}>
						<Left>
							<Text>{this.props.unit}</Text>
						</Left>
						<Right>
							<Icon name="arrow-forward" style={styles.picker}/>
						</Right>
					</ListItem>
					<ListItem itemDivider>
						<Text>Comments (Optional)</Text>
					</ListItem>
					<ListItem style={{flexWrap: 'wrap'}}>
						<Textarea
							style={styles.comments}
							rowSpan={5}
							bordered
							placeholder="Add comments..."
							value={this.props.comments}
							onChangeText={(text) => {
								this.props.updateProductComments(text);
								this.props.textValidation(text);
							}}
						/>
						{
							this.props.commentsValidation != undefined
							? (
								<View style={styles.errorMessage2}>
									<Icon name="ios-information-circle" style={styles.errorInfo}/>
									<Text style={styles.error}>{this.props.commentsValidation}</Text>
								</View>
							)
							: null
						}
					</ListItem>
				</List>
				</Content>
			</Container>
		);
	}
}

export default EditPricePage;
