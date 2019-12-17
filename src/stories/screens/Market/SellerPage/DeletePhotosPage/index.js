import styles from "./styles";
import { Button, Container, Content, Icon, Text, ActionSheet, Header, Left, Body, Title, Right} from "native-base";
import { Image, View } from "react-native";
import {connect} from 'react-redux';
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//State
	selected: Array<boolean>,
	//Functions
	adImageIsLoading: Function,
	selectPhoto: Function,
	removeAdImages: Function,
}
export interface State {}
class DeletePhotosPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		let numOfSelected = this.props.selected.filter(selected => selected == true).length + " Selected";
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>{numOfSelected}</Title>
					</Body>
					<Right>
						<Button transparent onPress = {() => {
							this.props.adImageIsLoading(true);
							this.props.removeAdImages(this.props.selected);
							this.props.navigation.navigate("EditAd");
						}}>
							<Text>Done</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={styles.imagesContainer}>
						{
							this.props.adImages.map((image, i) => (
								<Button transparent
									key={i}
									style={styles.image}
									onPress={()=> {
										this.props.selectPhoto(i);
										this.forceUpdate();
									}}
								>
									<Image style={styles.image} source={{uri: image}}/>
									<View style={styles.icon}>
										{
											this.props.selected[i]
											? <Icon active name="checkmark-circle" style={styles.tick}/>
											: null
										}
									</View>
								</Button>
							))
						}
					</View>
				</Content>
			</Container>
		);
	}
}

export default DeletePhotosPage;
