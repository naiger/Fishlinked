import styles from "./styles";
import MyAd from "./myAdComponent";
import { Button, Container, Content, Icon, Text, View, List, ListItem, Card, CardItem, Header, Left, Body, Right, Title, Spinner} from "native-base";
// @flow
import * as React from "react";
import { Image, RefreshControl } from "react-native";

export interface Props {
	navigation: any;
	//state
	currentUser: Object,
	del: boolean,
	myAds: Array<Object>;
	myAdsIsLoading: boolean,
	//Functions
	deleteButton: Function,
	removeAd: Function,
	fetchAdImages: Function,
	initialAdImages: Function,
	initialProductName: Function,
	initialProductDescription: Function,
	fetchLikeList: Function,
	fetchMyAdsList: Function,
}
export interface State {}
class MyAdsListPage extends React.Component<Props, State> {

	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.navigate("CategoryList")}>
							<Icon name="ios-switch"/>
						</Button>
					</Left>
					<Body>
						<Title>Seller</Title>
					</Body>
					<Right/>
				</Header>
				<View style={styles.subtitle}>
					<View style={styles.remove}>
						<Button transparent onPress={()=>this.props.navigation.navigate("CreateAd")}>
							<Icon name="add"/>
						</Button>
					</View>
						<Text>Products</Text>
						<View style={styles.remove}>
							{this.props.deleteButton}
						</View>
				</View>
				<Content
					refreshControl={
						<RefreshControl
							refreshing={this.props.myAdsIsLoading}
							onRefresh={()=>this.props.fetchMyAdsList(this.props.currentUser.id)}
							enabled={true}
							titile="Loading..."/>
				}>
					{ !this.props.myAds
						? <Text>No Result</Text>
						: (<List>
							{this.props.myAds.map((ad,i) => (
								<MyAd
									key={i}
									ad={ad}
									del={this.props.del}
									currentUser={this.props.currentUser}
									navigation={this.props.navigation}
									removeAd={this.props.removeAd.bind(this)}
									fetchAdImages={this.props.fetchAdImages}
									initialAdImages={this.props.initialAdImages}
									initialProductName={this.props.initialProductName}
									initialProductDescription={this.props.initialProductDescription}
									fetchLikeList={this.props.fetchLikeList}
								/>))}
						</List>)
					}
				</Content>
			</Container>
		);
	}
}

export default MyAdsListPage;
