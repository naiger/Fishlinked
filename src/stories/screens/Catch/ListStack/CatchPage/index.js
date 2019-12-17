import Carousel from 'react-native-carousel-view';
import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Title, Separator, Text, View, List, ListItem, Footer} from "native-base";
// @flow
import * as React from "react";
import { Image, Modal, TouchableOpacity} from "react-native";
import {ImageViewer} from 'react-native-image-zoom-viewer';
import { Dimensions, Alert } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export interface Props {
	navigation: any;
	//State
	isOpen: boolean,
	photoIndex: number,
	currentUser: Object,
	//Functions
	openPhotoViewer: Function,
	getPhotoUrls: Function,
	enterChannel: Function,
}
export interface State {}
class CatchPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const items = [
			{"Fish": param.catch.acf.fish},
			{"Bait": param.catch.acf.bait},
			{"Tide": param.catch.acf.tide},
			{"Equipment": param.catch.acf.equipment},
			{"Weight": param.catch.acf.weight},
		];
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={()=>this.props.navigation.goBack()}>
							 <Icon name="arrow-back" />
						</Button>
					</Left>
					<Body><Title>{param.catch.title.rendered}</Title></Body>
					<Right>
						<Button transparent onPress={()=>{
							this.props.currentUser === null
							? Alert.alert(
									 "Alert",
									 "You must login first to access this page.",
									 [
										 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage", {from: "ListPage", to: "ListPage"})},
										 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
										 {text: "Cancel", style:"cancel"},
									 ]
							 	)
							: this.props.enterChannel(param.catch.author)
						}}>
							<Text style={{color: this.props.currentUser === null ? "grey": "blue"}}>Message</Text>
						</Button>
					</Right>
				</Header>
				<Content>
						<View>
						{
							param.catch.acf.gallery
							? (
								<View style={styles.imageContainer}>
									<Carousel
										width={deviceWidth*0.9}
										height={deviceWidth*0.9}
										animate={false}
										indicatorSize={20}
										indicatorOffset={10}
										indicatorText="•"
										inactiveIndicatorText="•"
									>
									{
										param.catch.acf.gallery.map((image,i) => (
											<TouchableOpacity
												style={styles.image}
												key={i}
												onPress={()=>this.props.openPhotoViewer(true, i)}>
												<Image style={styles.image} source={{uri:image.url}}/>
											</TouchableOpacity>
										))
									}
									</Carousel>
								</View>
							)
							: <View style={styles.noPicContainter}><Text>No Picture</Text></View>
						}
							<View style={styles.dateContainer}><Text style={styles.textStyle}> {param.catch.date.slice(0,10)}</Text></View>
						</View>
						<List dataArray={items}
							renderRow={(item) =>
								<ListItem>
									<Left><Text>{Object.keys(item)}</Text></Left>
									<Text>{Object.values(item)}</Text>
								</ListItem>
							}>
						</List>
				</Content>
				<Modal
					style={styles.modalStyle}
					transparent={true}
				 	visible={this.props.isOpen}>
						<ImageViewer
							imageUrls={this.props.getPhotoUrls()}
							renderFooter={() =>(
								<View style={styles.closeButton}>
									<Button block transparent onPress={()=>this.props.openPhotoViewer(false, 0)}>
										<Text style={{color: "white"}}>Close</Text>
									</Button>
								</View>
							)}
							index={this.props.photoIndex}
							/>
				</Modal>
			</Container>
		);
	}
}
export default CatchPage;
