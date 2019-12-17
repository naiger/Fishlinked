import {ImageViewer} from 'react-native-image-zoom-viewer';
import styles from "./styles";
import Carousel from "react-native-carousel-view";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Thumbnail, Title, Spinner} from "native-base";
// @flow
import * as React from "react";
import { Dimensions, Image, View, TouchableOpacity, Modal, Alert } from "react-native";

export interface Props {
	navigation: any;
	//state
	likeIsLoading: boolean,
	likeList: Array<number>,
	adImages: Array<string>,
	imageIsLoading: boolean,
	seller: Object,
	sellerIsLoading: boolean,
	isViewOpen: boolean,
	imageIndex: number,
	currentUser: Object,
	//Functions
	likeHandler: Function,
	openImageViewer: Function,
	getImageUrls: Function,
	enterChannel: Function,
}
export interface State {}
class AdDetailPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const deviceWidth = Dimensions.get("window").width;
		console.log("imageIsLoading "+param.ad.acf.images);
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> {
							param.prevPage
							? this.props.navigation.navigate(param.prevPage)
							: this.props.navigation.goBack()
						}}>
							<Icon name="ios-arrow-back"/>
							<Text style={styles.leftHeader}>
							{
								param.title === "Travel and Tours"
								? "Travel"
								: param.title
							}
							</Text>
						</Button>
					</Left>
					<Body>
						<Title>{param.ad.title.rendered}</Title>
					</Body>
					<Right>
						<Button transparent onPress={()=>{
							this.props.currentUser === null
							? Alert.alert(
									 "Alert",
									 "You must login first to enable this function.",
									 [
										 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage", {from: "BuyerPage", to: "BuyerPage"})},
										 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
										 {text: "Cancel", style:"cancel"},
									 ]
							 	)
							: this.props.enterChannel(param.ad.acf.seller)
						}}>
						<Text style={{color: this.props.currentUser === null? "grey": "blue"}}>Buy</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					{
						this.props.userIsValid && this.props.likeIsLoading || this.props.sellerIsLoading
						? <Spinner color="grey"/>
						: (
							<View>
							<View style={styles.item}>
								//like button
								<View styel={styles.heart}>
										<Button transparent onPress={() => this.props.likeHandler(param.ad.id)}>
											{
												this.props.likeList.indexOf(param.ad.id) > -1
												? <Icon active name="heart" style={styles.like}/>
												: <Icon name="heart" style={styles.like}/>
											}
										</Button>
								</View>
							//image carousel
							{
								this.props.imageIsLoading
								? (
										<View style={styles.image}>
											<Spinner color="grey"/>
											<Text>Loading</Text>
										 </View>
								 )
								: this.props.adImages.length === 0
									? <View style={styles.image}><Text>No Picture</Text></View>
									: (
											<View>
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
													this.props.adImages.map((image,i) => (
														<TouchableOpacity
															style={styles.image}
															key={i}
															onPress={()=> this.props.openImageViewer(true, i)}>
															<Image style={styles.image} source={{uri:image}}/>
														</TouchableOpacity>
													))
												}
												</Carousel>
											</View>
										)
							}
							<View style={styles.cardRight}>
								<View style={styles.avatar}>
									<Thumbnail square small source={{uri:
										this.props.seller === null
										? "https://secure.gravatar.com/avatar/bbf70175ed4c4a189d292920d3bc203b?s=24&d=mm&r=g"
										: this.props.seller.avatar_urls["24"]}}/>
								</View>
									<View style={styles.price}>
										<Icon  name="pricetag"/>
										<Text style={styles.priceText}>${param.ad.price}</Text>
									</View>
							</View>
							</View>
								<View style={styles.textArea}>
									<View style={styles.textBox}>
										<Text>{param.ad.comments}</Text>
									</View>
								</View>
							</View>
						)
					}
				</Content>
				<Modal
					style={styles.modalStyle}
					transparent={true}
				 	visible={this.props.isViewOpen}>
						<ImageViewer
							imageUrls={this.props.getImageUrls()}
							renderFooter={() =>(
								<View style={styles.closeButton}>
									<Button block transparent onPress={()=>this.props.openImageViewer(false, 0)}>
										<Text style={{color: "white"}}>Close</Text>
									</Button>
								</View>
							)}
							index={this.props.imageIndex}
							/>
				</Modal>
			</Container>
		);
	}
}

export default AdDetailPage;
