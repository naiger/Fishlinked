import styles from "./styles";
import { Button, Container, Content, Icon, Left, Right, Text, Title, List, ListItem, Header, Body, Spinner} from "native-base";
import {Image, View, Alert} from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//state
	userIsValid: boolean,
	categories: Array<Object>,
	categoriesIsLoading: boolean,
}
export interface State {}
class CategoryListPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> {
							this.props.userIsValid
							? this.props.navigation.navigate("SellerPage")
						  : Alert.alert(
								 "Alert",
								 "You must login first to access this page.",
								 [
									 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage", {from: "BuyerPage", to: "BuyerPage"})},
									 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
									 {text: "Cancel", style:"cancel"},
								 ]
               )
						}}>
							<Icon name="ios-switch"/>
						</Button>
					</Left>
					<Body>
						<Title>Buyer</Title>
					</Body>
					<Right/>
				</Header>
				<Content>
					{
						this.props.categoriesIsLoading
						? <Spinner color="grey"/>
						: !this.props.categories
						  ? <Text style={styles.title}>No Result</Text>
						  : (<List>
							{
								this.props.categories.map((category)=>(
									<Button transparent
										style={styles.button}
										key={category.id}
										onPress={()=>{this.props.navigation.navigate("AdList",{title: category.name, id: category.id});}}
									>
										<View style={styles.item}>
											<Text style={styles.title}>{category.name}</Text>
											<Image style={styles.image} source={{uri: category.description}}/>
							   	</View>
									</Button>
									)
								)
							}
							</List>
						)
					}
				</Content>
			</Container>
		);
	}
}

export default CategoryListPage;
