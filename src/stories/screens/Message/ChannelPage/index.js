import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title, Spinner, View, List, ListItem, Badge } from "native-base";
// @flow
import * as React from "react";
import { RefreshControl } from "react-native";

export interface Props {
	navigation: any;
	//State
	currentUser: Object,
	myChannels: Array<Object>,
	isChannelListFetching: boolean,
	isChannelsStatusFetching: boolean,
	//Functions
	getChatUserId: Function,
	fetchChatUser: Function,
	cleanMessageList: Function,
	fetchMessageList: Function,
	fetchChannelList: Function,
	fetchMyChannelsStatus: Function,
	getChannelFriendlyNameBySid: Function,
	updateLastComsumedMessageIndex: Function,
}
export interface State {}
class ChannelPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={()=>this.props.navigation.navigate("Catch")}>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body><Title>Messages</Title></Body>
					<Right/>
				</Header>
				<Content
					refreshControl={
						<RefreshControl
							refreshing={!this.props.currentUser === null && (this.props.isChannelListFetching)}
							onRefresh={()=> {
								this.props.fetchChannelList();
								this.props.fetchMyChannelsStatus(this.props.currentUser.id);
							}}
							enabled={true}
							titile="Loading..."/>}
					>
					<List>
					{
						this.props.currentUser === null || this.props.isChannelListFetching
						? null
						:	this.props.myChannels.length > 0
							? this.props.myChannels.map((channel, i) => {
							  let friendlyName = this.props.getChannelFriendlyNameBySid(channel.channel_sid);
								return (
									<ListItem key={i} onPress={()=>{
										this.props.fetchChatUser(this.props.getChatUserId(channel.channel_sid));
										this.props.cleanMessageList();
										this.props.fetchMessageList(channel.channel_sid, true);
										this.props.updateLastComsumedMessageIndex(
											channel.channel_sid,
											channel.member_sid,
											(channel.last_consumed_message_index + channel.unread_messages_count)
										);
										this.props.navigation.navigate("MessagePage",{sid: channel.channel_sid, friendlyName: friendlyName});
									}}>
										<Body>
											<View style={styles.channelRow}>
												<Text>{friendlyName}  </Text>
												{
													channel.unread_messages_count > 0
												  ? <Badge><Text>{channel.unread_messages_count}</Text></Badge>
													: null
												}
											</View>
										</Body>
										<Right><Icon name="arrow-forward"/></Right>
									</ListItem>
								);
							})
						 	: null
					}
					</List>
				</Content>
			</Container>
		);
	}
}
export default ChannelPage;

// add new channel
// <ListItem itemDivider><Text>Add New Channel</Text></ListItem>
// <ListItem onPress={() => this.props.navigation.navigate("ProfilePage")}>
// 	<Icon name="add-circle"/><Text>  Find a Member</Text>
// </ListItem>
