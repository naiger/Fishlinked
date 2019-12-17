
import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, List, Title} from "native-base";
import {Image, View, Alert} from "react-native";
import {ImagePicker, Permissions} from "expo";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//State
	categories: Array<Object>;
	//Functions
	initialAdImages: Function;
	initialProductName: Function,
	initialProductDescription: Function,
	setCategory: Function,
	generateNewDraft: Function,
}
export interface State {}
class CreateAdPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
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
							 ]);
						}}>
							<Icon name="close"/>
						</Button>
					</Left>
					<Body>
						<Title>New Product</Title>
					</Body>
					<Right/>
				</Header>
				<Content>
				<View style={styles.title}>
					<Title>Step 1 - Select Category</Title>
				</View>
				<List>
				{
					!this.props.categories
					? <Text style={styles.categoryTitle}>No Result</Text>
					: this.props.categories.map((category, i)=>(
						<Button transparent
							key ={i}
							style={styles.button}
							onPress={() => {
								this.props.setCategory(category.id);
								this.props.initialAdImages([]);
								this.props.initialProductName("");
								this.props.initialProductDescription("");
								this.props.navigation.navigate("ImageBrowser",{ad: false})
							}}
						>
							<View style={styles.item}>
								<View><Text style={styles.categoryTitle}>{category.name}</Text></View>
								<Image style={styles.image} source={{uri: category.description}}/>
							</View>
						</Button>
						)
					)
				}
				</List>
				</Content>
			</Container>
		);
	}
}

export default CreateAdPage;
