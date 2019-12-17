import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title,Thumbnail,View,List,ListItem, Spinner, Label, SwipeRow, Item } from "native-base";
// @flow
import * as React from "react";
import { Modal, Alert, RefreshControl} from "react-native";

export interface Props {
	navigation: any;
	//state
	currentUser: Object,
	userIsValid: boolean,
	cardList: Array<Object>,
	cardListIsLoading: boolean,
	cardListError: Object,
	isMyProfileLoading: boolean,
	//Funcitons
	myInfo: Function,
	logout: Function,
	isMyCatch: Function,
	fetchCurrentUser: Function,
}
export interface State {}
class MePage extends React.Component<Props, State> {

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
					<Body><Title>Me</Title>
					</Body>
					<Right>
						<Button transparent onPress={() => {
							Alert.alert(
								"Alert",
								"Do you want to logout?",
								[
									{text: "Logout", onPress:() => {
										this.props.logout();
										this.props.navigation.navigate("LaunchPage");
									}},
									{text: "Cancel", style:"cancel"},
								],
							)
						}}>
							<Text style={{color:"red"}}>Logout</Text>
						</Button>
					</Right>
				</Header>
				<Content
					refreshControl={
						<RefreshControl
							refreshing={this.props.isMyProfileLoading}
							onRefresh={()=> this.props.fetchCurrentUser()}
							enabled={true}
							titile="Loading..."/>}
				>
					<List>
						<ListItem>
						  <Thumbnail source={{uri:
								this.props.currentUser
								? this.props.currentUser.avatar_urls["96"]
								: "https://secure.gravatar.com/avatar/bbf70175ed4c4a189d292920d3bc203b?s=96&d=mm&r=g"}} />
							<Body>
								<Text>{this.props.currentUser? this.props.currentUser.first_name+" "+this.props.currentUser.last_name : null}</Text>
								<Text>{this.props.currentUser? this.props.currentUser.email: null}</Text>
							</Body>
						 </ListItem >
							 {this.props.myInfo("My Info", "Edit Profile", "EditProfilePage")}
							<ListItem itemDivider><Text>My Catch</Text></ListItem>
				 			<ListItem onPress={()=>{
				 				this.props.isMyCatch(true);
				 				this.props.navigation.navigate("Catch");
				 			}}>
				 			 <Body><Text>Catch History</Text></Body>
				 			 <Right><Icon name='arrow-forward' /></Right>
				 			</ListItem>
							 {this.props.myInfo("Legal Agreement", "End User License Agreement", "UserAgreementPage")}
							 {this.props.myInfo("Blocked List", "Edit Block List", "")}
						 	 {this.props.myInfo("My Currency", this.props.currentUser ?this.props.currentUser.acf.currency: "AUD", "MyCurrencyPage")}
							<ListItem itemDivider><Text>My Credit Cards</Text></ListItem>
							 {
								this.props.cardListIsLoading
								? <Spinner color="grey"/>
								: this.props.cardList.length > 0
									? this.props.cardList.map((card, i) => (
										<SwipeRow
											style = {{backgroundColor: "#FBFAFA"}}
											 key ={i}
											 disableRightSwipe = {true}
											 rightOpenValue={-75}
											 body={
													<View style={styles.cardRow}>
													 	<View style={styles.left}><Text>{card.brand}</Text></View>
													 	<View style={styles.body}><Text>XXXX XXXX XXXX {card.last4}</Text></View>
													</View>
											 }
											 right={
												 <Button danger onPress={() => alert('Trash')}>
													 <Icon active name="trash" />
												 </Button>
											 }
										 />
									))
									: null
							}
						 <ListItem onPress={()=>{
							 this.props.navigation.navigate("CreditCardDetailPage");
						 }}>
							<Body><Text>Add New Credit Card</Text></Body>
							<Right><Icon name='arrow-forward' /></Right>
						 </ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

export default MePage;
