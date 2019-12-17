//import {ImagePicker, Permissions} from "expo";
import styles from "./styles";
import { Button, Container, Content, Icon, ActionSheet, Title, Text, Header, Left, Body, Right, Spinner} from "native-base";
import { Dimensions, Image, View, Alert, NativeModules} from "react-native";
import Carousel from "react-native-carousel-view";
// @flow
import * as React from "react";

export interface Props {
	//state
	navigation: any;
	adImages: Array<any>,
	imageIsUploading: boolean,
	imageIsLoading: boolean,
	//Functions
	initIndex: Function,
	imagesRemoved: boolean,
	openImageBrowser: Function,
	generateNewDraft: Function,
}
export interface State {}
class EditAdPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const deviceWidth = Dimensions.get("window").width;
		return (
			<Container style={styles.container}>
				<Header>
				<Left>
					{
						param.ad
						? (
							<Button transparent onPress = {()=> this.props.navigation.navigate("MyAdsList")}>
								<Icon name="ios-arrow-back"/>
							</Button>
						)
						:(
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
						)
					}
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
						this.props.imageIsUploading
						? <Button transparent><Text style={styles.disabled}>Next</Text></Button>
						: (
							<Button transparent
								onPress = {
									()=> {
										this.props.navigation.navigate("EditDescription", {ad: param.ad, id: param.id}
									)}
								}>
								<Text style={styles.enable}>Next</Text>
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
								? "Step 1 - Edit Photos"
								: "Step 2 - Select Photos"
							}
						</Title>
					</View>
					<View>
					{

						param.ad && this.props.imageIsLoading
							? (
								<View style={styles.image}>
									<Spinner color="grey"/>
									<Text>Loading</Text>
								</View>
							)
							: this.props.imageIsUploading
								? (
									<View style={styles.image}>
										<Spinner color="grey"/>
										<Text>Uploading</Text>
									</View>
								)
								: (
									<Carousel
										width={deviceWidth*0.7}
										height={deviceWidth*0.7}
										animate={false}
										indicatorSize={20}
										indicatorOffset={10}
										indicatorText="•"
										inactiveIndicatorText="•"
									>
									{
										this.props.adImages && this.props.adImages.length > 0
										?	this.props.adImages.map((image,i) => (
												<View style={styles.image} key={i}>
													<Image style={styles.image} source={{uri:image}}/>
												</View>
											))
										:(<View style={styles.image}><Text>No Picture</Text></View>)
									}
									</Carousel>
								)
						}
						</View>
						<View style={styles.button}>
							<Button transparent
								style={styles.button}
								onPress={() =>
								ActionSheet.show(
									{
										options:["Add Photo", "Delete Photo", "Cancel"],
										destructiveButtonIndex: 1,
										cancelButtonIndex: 2,
										title: "Edit Photos"
									},
									buttonIndex =>{
										if(buttonIndex === 0) {
											this.props.openImageBrowser;
											this.props.navigation.navigate("ImageBrowser", {ad: param.ad});
										};
										if(buttonIndex === 1)	{
											this.props.initIndex(this.props.adImages.length);
											this.props.adImages.length > 0
											? this.props.navigation.navigate("DeletePhotos")
											: Alert.alert(
												"No photos to delete",
												"There are no photos can be deleted, please choose other edit options.",
												[
													{text: "OK", style:"cancel"},
												],
											)
										};
									}
								)}
						>
							<Text>Edit Photos</Text>
						</Button>
						</View>
				</View>
				</Content>
			</Container>
		);
	}
}

export default EditAdPage;
