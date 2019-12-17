import Carousel from 'react-native-carousel-view';
import styles from "./styles";
import { Button, Container, Content, Icon, Text, Title, View, Thumbnail, Header, Left, Body, Right} from "native-base";
import { Dimensions} from "react-native";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
}
export interface State {}
class MemberDetailPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const deviceWidth = Dimensions.get("window").width;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={()=>{this.props.navigation.goBack()}}>
						 <Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title style={{fontSize: 20,fontWeight: 'bold'}}>{param.member.name}</Title>
					</Body>
					<Right>
						<Button transparent onPress={()=>{this.props.navigation.navigate("Messages")}}>
							<Text style={{fontSize:15,color:"blue"}}>Message</Text>
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={styles.avatarContainer}>
						<View style={styles.avatar}>
					 		<Thumbnail large source={{uri: param.member.avatar_urls["96"]}}/>
						</View>
						<View style={styles.info}>
							<Title>Rating</Title>
							<Title>Followers</Title>
							<Title>Ads</Title>
						</View>
						<View style={styles.rate}>
							<Text style={styles.rateFont}>10/10</Text>
							<Text style={styles.rateFont}>4</Text>
							<Text style={styles.rateFont}>{param.ads}</Text>
						</View>
					</View>
					<View style={styles.iconContainer}>
						<Button style={styles.icon} transparent>
							<Icon name="heart"/>
						</Button>
						<Button style={styles.icon} transparent>
							<Icon name="chatbubbles"/>
						</Button>
						<Button style={styles.icon} transparent>
							<Icon name="paper"/>
						</Button>
						<Button style={styles.icon} transparent>
							<Icon name="share"/>
						</Button>
					</View>
					<View style={styles.imageContainer}>
						<Carousel
							width={deviceWidth*0.8}
							height={deviceWidth*0.5}
							animate={false}
							indicatorSize={20}
							indicatorOffset={0}
							indicatorText="•"
							inactiveIndicatorText="•"
						>
							<View style={styles.image}><Text>No Picture</Text></View>
							<View style={styles.image}><Text>No Picture 2</Text></View>
						</Carousel>
					</View>
					<View style={styles.aboutContainer}>
						<View style={styles.aboutTitle}>
							<Text style={styles.about}>About</Text>
						</View>
						<View style={styles.description}>
							<Text>
								{
									param.member.description === ""
									? "Here is no description, please write something"
									: param.member.description
								}
							</Text>
						</View>
					</View>
				</Content>
			</Container>
		);
	}
}

export default MemberDetailPage;
