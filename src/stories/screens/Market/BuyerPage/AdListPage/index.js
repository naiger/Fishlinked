import styles from "./styles";
import { Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text, List,ListItem, Title, Spinner, Item, Input} from "native-base";
// @flow
import * as React from "react";
import { Image, View, RefreshControl, Alert } from "react-native";

export interface Props {
	//state
	navigation: any,
	currentUser: Object,
	adList: Array<Object>,
	adsIsLoading: boolean,
	likeList: Array<number>,
	likeIsLoading: boolean,
	userIsValid: boolean,
	adsIsSearching: boolean,
	//Functions
	likeHandler: Function,
	initialAdImages: Function,
	enableAdsSearch: Function,
	searchAds: Function,
	fetchAdList: Function,
	enterChannel: Function,
}
export interface State {}
class AdListPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		console.log(param);
		return (
			<Container style={styles.container}>
				<Header hasSegement>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back"/>
							<Text style={styles.leftHeader}>Buyer</Text>
						</Button>
					</Left>
					<Body>
						<Title>
						{
							param.title === "Travel and Tours"
							? "Travel"
							: param.title
						}
						</Title>
					</Body>
					<Right>
						<Button transparent onPress={()=> this.props.enableAdsSearch(true)}>
							<Icon name="search"/>
						</Button>
					</Right>
				</Header>
				{
					this.props.adsIsSearching
					? (
						<View style={styles.searchContainer}>
							<Item inlineLable rounded style={styles.searchbar}>
								<Icon name="ios-search" />
								<Input placeholder="Search" onChangeText={(text) => this.props.searchAds(text)}/>
							</Item>
							<Button transparent onPress={() => {
								this.props.enableAdsSearch(false);
								this.props.searchAds("");
							}}>
								<Icon name="close"/>
							</Button>
						</View>
					)
					: null
				}
				<Content
					refreshControl={
						<RefreshControl
							refreshing={this.props.adsIsLoading || (this.props.userIsValid && this.props.likeIsLoading)}
							onRefresh={()=>this.props.searchAds("")}
							enabled={true}
							titile="Loading..."/>
					}>
					<List>
					{this.props.adList.map((ad, i) =>
						(
							//Click card enable redirection to product detail page
							<ListItem key={i} onPress={()=>{
								this.props.initialAdImages(ad.images.length);
								this.props.navigation.navigate("AdDetail",{ad:ad, title:param.title})
							}}>
							<Card>
								<CardItem cardBody>
									//Like Function on the left side of the card
									{
										<Button transparent onPress={() => this.props.likeHandler(ad.id)}>
											{
												this.props.likeList.indexOf(ad.id) > -1
												? <Icon active name="heart" style={styles.like}/>
												: <Icon name="heart" style={styles.like}/>
											}
										</Button>
									}
									//Show the first image of the product
									//if no image, show "No Picture"
									{
										ad.images.length > 0
										? <Image style={styles.image} source={{uri:ad.better_featured_image ? ad.better_featured_image.source_url : ad.images[0]}}/>
										: (<View style={styles.image}>
												<Text>No Picture</Text>
											</View>)
									}
									//Buy buttom and product price on the right side of the card
									<View style={styles.cardRight}>
										//Buy buttom liking to massage page
										<Button transparent onPress={()=> {
											this.props.currentUser === null
											? Alert.alert(
												 "Alert",
												 "You must login first to enable this function.",
												 [
													 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage", {from: "AdList", to: "BuyerPage"})},
													 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
													 {text: "Cancel", style:"cancel"},
												 ]
										 		)
											: this.props.enterChannel(ad.acf.seller)
										}}>
											<Text style={{color: this.props.currentUser === null? "grey": "blue"}}>Buy</Text>
										</Button>
											//price tag
											<View style={styles.price}>
												<Icon  name="pricetag"/>
												<Text style={styles.priceText}>${ad.price}</Text>
											</View>
									</View>
								</CardItem>
								//Show the product name on the bottom of the card
								<CardItem>
									<View style={styles.toDetail}>
										<Text style={styles.itemName}>{ad.title.rendered}</Text>
									</View>
								</CardItem>
							</Card>
							</ListItem>
						)
					)}
					</List>
				</Content>
			</Container>

		);
	}
}

export default AdListPage;
