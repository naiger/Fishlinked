import styles from "./styles";
import { Button, Container, Content, Icon, Text, ActionSheet, Input, Textarea, Title, Header, Right, Body, Left} from "native-base";
import { Dimensions, Image, View } from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//State
	name: string,
	description: string,
	currentUser: Object,
	media: Array<number>,
	nameValidation: string,
	descriptionValidation: string,
	//Functions
	updateProductName: Function,
	updateProductDescription: Function,
	updateAd: Funciton,
	textValidation: Function,
}
export interface State {}
class EditDescriptionPage extends React.Component<Props, State> {
	render() {
		console.log(this.props.descriptionValidation);
		const param = this.props.navigation.state.params;
		const deviceWidth = Dimensions.get("window").width;
		const values = {
			"title": this.props.name,
			"featured_media": this.props.media[0],
			"fields": {
				"images": this.props.media,
				"description": this.props.description,
			}
		}
		return (
			<Container style={styles.container}>
			<Header>
				<Left>
					<Button transparent onPress = {()=> this.props.navigation.goBack()}>
						<Icon name="ios-arrow-back"/>
					</Button>
				</Left>
				<Body>
					<Title>
					{
						param.ad
						? "Edit Product"
						: "New Product"
					}
					</Title>
				</Body>
				<Right>
					{
						param.ad
						? this.props.nameValidation === undefined
							&& this.props.descriptionValidation === undefined
							&& this.props.name.length > 0
							&& this.props.description.length > 0
							? (<Button transparent onPress = {()=> {
									this.props.updateAd(values, this.props.currentUser.id, param.id);
									this.props.navigation.navigate("MyAdsList")
								}}>
										<Text style={styles.enable}>Done</Text>
								 </Button>)
							: (
								<Button transparent onPress={()=>{
									this.props.textValidation(this.props.name, "name");
									this.props.textValidation(this.props.description, "description");
								}}>
									<Text style={styles.disabled}>Done</Text>
								</Button>
							)
						: this.props.nameValidation === undefined
							&& this.props.descriptionValidation === undefined
							&& this.props.name.length > 0
							&& this.props.description.length > 0
							? (<Button transparent onPress ={()=>this.props.navigation.navigate("EditPrice")}>
									<Text style={styles.enable}>Next</Text>
							 	</Button>)
							: (
								<Button transparent onPress={()=>{
									this.props.textValidation(this.props.name, "name");
									this.props.textValidation(this.props.description, "description");
								}}>
									<Text style={styles.disabled}>Done</Text>
								</Button>
							)
					}
				</Right>
			</Header>
				<Content>
				<View style={styles.page}>
					<View style={styles.title}>
						<Title>
							{ param.ad
								? "Step 2 - Description"
								: "Step 3 - Description"
							}
						</Title>
					</View>
					<View style={styles.name}>
						<Input
							placeholder="Product Name"
							value={this.props.name}
							onChangeText={(text) => {
								this.props.updateProductName(text);
								this.props.textValidation(text, "name");
							}}
							onFocus={() => this.props.textValidation(this.props.name, "name")}
							/>
					</View>
					{
						this.props.nameValidation != undefined
						? (
							<View style={styles.errorMessage}>
								<Icon name="ios-information-circle" style={styles.errorInfo}/>
								<Text style={styles.error}>{this.props.nameValidation}</Text>
							</View>
						)
						: null
					}
					<Textarea
						style={styles.description}
						rowSpan={10}
						bordered
						placeholder="Describe your product..."
						value={this.props.description}
						onChangeText={(text) => {
							this.props.updateProductDescription(text);
							this.props.textValidation(text, "description");
							}}
						onFocus={() => this.props.textValidation(this.props.description, "description")}
						/>
						{
							this.props.descriptionValidation != undefined
							? (
								<View style={styles.errorMessage2}>
									<Icon name="ios-information-circle" style={styles.errorInfo}/>
									<Text style={styles.error}>{this.props.descriptionValidation}</Text>
								</View>
							)
							: null
						}
				</View>
				</Content>
			</Container>
		);
	}
}

export default EditDescriptionPage;
