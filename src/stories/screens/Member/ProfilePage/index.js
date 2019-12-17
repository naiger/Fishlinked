import styles from "./styles";
import { Body, Button, Container, Content, Icon, Left, Right, Title, List, ListItem, Header, View, Text} from "native-base";
// @flow
import * as React from "react";
import { Image, Alert } from 'react-native';
export interface Props {
	navigation: any;
	//State
	imageList: Array<Object>,
	userIsValid: boolean,
	//Functions
}
export interface State {}
class ProfilePage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return(
			<Container style={styles.container}>
				<Header>
					<Left/>
					<Body><Title>Members</Title></Body>
					<Right>
					{
						this.props.userIsValid
						? (<Button transparent onPress={()=>{this.props.navigation.navigate("MePage")}}>
								<Text style={{color: "blue"}}>Me</Text>
							</Button>)
						: (<Button transparent onPress={()=>
								Alert.alert(
								 "Alert",
								 "You must login first to access this page.",
								 [
									 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage",{from: "ProfilePage", to:"MePage"})},
									 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
									 {text: "Cancel", style:"cancel"},
								 ])}>
								<Text style={{color: "grey"}}>Me</Text>
							</Button>)
					}
					</Right>
				</Header>
				<Content>
				 <List>
	 				{this.props.imageList.map((items,i)=>(
						<Button
						 	 key={i}
							 style={styles.button}
							 onPress={()=> {
								 this.props.userIsValid
								 ? this.props.navigation.navigate("MemberList")
								 : Alert.alert(
					 				 "Alert",
					 				 "You must login first to access this page.",
					 				 [
					 					 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage",{from: "ProfilePage", to:"MePage"})},
					 					 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
					 					 {text: "Cancel", style:"cancel"},
					 				 ]
					 		 	);
							 }}>
							 <View style={styles.item}>
									<Text style={styles.title}>{items.name}</Text>
									<Image style={styles.image} source={items.image} />
								</View>
						 </Button>
					))}
					</List>
				</Content>
			</Container>
		);
	}
}
export default ProfilePage;
