import styles from "./styles";
import { Button, Container, Content, Icon, Text, ActionSheet, Header, Left, Body, Title, Right} from "native-base";
import { Image, View, CameraRoll, FlatList, Dimensions } from "react-native";
import * as React from "react";
export interface Props {
	navigation: any;
	//state
	catchPicked: Array<boolean>,
	catchGallery: Array<string>,
	//Functions
	pickCatchPhoto: Function,
	callback: Function,
	uploadCatchPhoto: Function,
}
export interface State {}
class PhotoBrowserPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		let numOfPicked = this.props.catchPicked.filter(picked => picked == true).length + " Selected";
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.navigate("ListStack")}>
							<Icon name="ios-arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>{numOfPicked}</Title>
					</Body>
					<Right>
						<Button transparent onPress = {() => {
								this.props.callback().map(image => this.props.uploadCatchPhoto(image));
								this.props.navigation.navigate("PostItem",{photos: this.props.callback().length});
						}}>
							<Text>Select</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={styles.imagesContainer}>
						{
							this.props.catchGallery.map((image,i) => (
								<Button transparent
									key={i}
									style={styles.image}
									onPress={()=> {
										this.props.pickCatchPhoto(i);
										this.forceUpdate();
								}}>
									<Image style={styles.image} source={{uri: image}}/>
									<View style={styles.icon}>
										{
											this.props.catchPicked[i]
											? <Icon active name="checkmark-circle" style={styles.tick}/>
											: null
										}
									</View>
							</Button>
						))}
					</View>
				</Content>
			</Container>
		);
	}
}

export default PhotoBrowserPage;
