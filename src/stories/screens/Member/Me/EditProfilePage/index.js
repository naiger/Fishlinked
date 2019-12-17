import {ImagePicker, Permissions} from 'expo';
import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,Thumbnail,View,List,ListItem, Spinner, Item, Label, Input, Form } from "native-base";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//state
	currentUser: Object,
	//Functions
	uploadAvatar: Function,
}
export interface State {}
class EditProfilePage extends React.Component<Props, State> {
	pickImage = async() =>{
		const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    console.log(permissions, status);
    if(status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(permissions, { error }));
      console.log(permissions, 'SUCCESS', image);
			if (!image.cancelled) {
	 		 this.props.uploadAvatar(image);
	 	 }
    }
	}
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={()=>{this.props.navigation.goBack()}}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body><Title>Edit Profile</Title>
					</Body>
					<Right>
						<Button transparent onPress={() => {
							Alert.alert(
								"Alert",
								"Do you want to update your porfile?",
								[
									{text: "Update", onPress:() => {
										this.props.navigation.navigate("MePage");
									}},
									{text: "Cancel", style:"cancel"},
								],
							)
						}}>
							<Text style={{color:"blue"}}>Update</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<Button transparent style={styles.avatar} onPress={()=>this.pickImage()}>
						<Thumbnail large source={{uri: this.props.currentUser.avatar_urls["96"]}} />
					</Button>
					<Form>
						<Item inlineLabel>
							<Label>First Name</Label>
							<Input placeholder={this.props.currentUser.first_name}/>
						</Item>
						<Item inlineLabel>
							<Label>Last Name</Label>
							<Input placeholder={this.props.currentUser.last_name}/>
						</Item>
					</Form>
				</Content>
			</Container>
		);
	}
}

export default EditProfilePage;
