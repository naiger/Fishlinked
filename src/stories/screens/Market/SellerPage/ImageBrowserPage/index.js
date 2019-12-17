import styles from "./styles";
import { Button, Container, Content, Icon, Text, ActionSheet, Header, Left, Body, Title, Right} from "native-base";
import { Image, View, CameraRoll, FlatList, Dimensions } from "react-native";
import * as React from "react";
export interface Props {
	//state
	navigation: any;
	picked: Array<boolean>,
	gallery: Array<string>,
	adImages: Array<string>,
	//Functions
	pickImage: Function,
	callback: Function,
	addAdImages: Function,
	uploadImage: Function,
	uploadCatchPhoto: Function,
}
export interface State {}
class ImageBrowserPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		let numOfPicked = this.props.picked.filter(picked => picked == true).length + " Selected";
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>{numOfPicked}</Title>
					</Body>
					<Right>
						<Button transparent onPress = {() => {
							this.props.callback().map(image => this.props.uploadImage(image));
							console.log(this.props.adImages);
							this.forceUpdate();
							this.props.navigation.navigate("EditAd",{ad: param.ad});
						}}>
							<Text>Select</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={styles.imagesContainer}>
						{
							this.props.gallery.map((image,i) => (
								<Button transparent
									key={i}
									style={styles.image}
									onPress={()=> {
										this.props.pickImage(i);
										this.forceUpdate();
								}}>
									<Image style={styles.image} source={{uri: image}}/>
									<View style={styles.icon}>
										{
											this.props.picked[i]
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

export default ImageBrowserPage;
