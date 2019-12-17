import styles from "./styles";
import { MapView } from "expo";
import { Body, Button, Container, Content, Icon, Input, Item, Text, View, Spinner} from "native-base";
import { Image } from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any,
	//State
	catchList: Array<Object>;
	isLoading: bool,
	searchResult:Array<Object>,
	locationKeyword: string,
	catchListIsSearching: boolean,
	mapRegion: Object,
	googleIsSearching: boolean,
	//Functions
	searchCatch:Function,
	setSearchLocationKeyword:Function,
	setMapRegion: Function,
	resetMapRegion: Function,
	getLocationFromGoogle: Function,
}
export interface State{}
class MapPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const initialRegion = {
			latitude: -33.8588,
			longitude: 151.2093,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05,
		};

		const pinInfo = "Tap a pin to see what the Catch is.";
		return (
			<Container style={styles.container}>
				<Content padder>
					<Item rounded style={styles.searchBar}>
						<Icon name="search"/>
						<Input
							placeholder="Search"
							onChangeText={text => this.props.setSearchLocationKeyword(text)}
							onEndEditing={() => {
								this.props.locationKeyword === ""
								? this.props.resetMapRegion()
								: this.props.getLocationFromGoogle(this.props.locationKeyword)
							}}/>
					</Item>
					<MapView
						style={styles.map}
						initialRegion={initialRegion}
						region={this.props.mapRegion}
						showsUserLocation={true}
						showsMyLocationButton={true}
						provider="google"
					>
					{
						this.props.isLoading
						? null
						: (this.props.catchList.map((item, i) => (
								<MapView.Marker
									key={i}
									ref={ref => {this.marker = ref}}
									coordinate={{latitude: Number(item.latitude), longitude: Number(item.longitude)}}
									onPress={(e) => {
										e.stopPropagation();
										this.props.setMapRegion(e.nativeEvent.coordinate);}}>
									<MapView.Callout onPress={(e) => {
										e.stopPropagation();
										this.props.navigation.navigate("CatchPage",{catch: item});
									}}>
										{
											<View>
											{
												item.better_featured_image
												? <Image style={styles.markerImage} source={{uri: item.better_featured_image.source_url}}/>
												: <View style={styles.markerImage}><Text>No Picture</Text></View>
											}
												<Text>{item.title.rendered}</Text>
											</View>
										}
									</MapView.Callout>
								</MapView.Marker>
							)))
					}
					</MapView>
					<Text style={styles.pinInfo}>{pinInfo}</Text>
					<Button block info onPress={() => {
						this.marker.hideCallout();
						this.props.resetMapRegion()}}>
						{
							this.props.isLoading || this.props.googleIsSearching
							? <Spinner color="grey"/>
							: <Text>Reset Map</Text>
						}
					</Button>
				</Content>
			</Container>
		);
	}
}

export default MapPage;
