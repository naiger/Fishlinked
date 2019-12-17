import ChannelPage from "../../../stories/screens/Message/ChannelPage";
// @flow
import {Body, Header, Left, Right, Title,Button,Icon} from 'native-base';
import * as React from "react";
import { Alert } from "react-native";
import {connect} from "react-redux";
import {
	fetchChannelList,
	createChannel,
	addUserToChannel,
	fetchMessageList,
	sendMessageToChannel,
	fetchChatUser,
	cleanMessageList,
	initialMessageLists,
	fetchMyChannelsStatus,
	updateNumberOfUnread,
	updateLastComsumedMessageIndex} from '../actions';

export interface Props {
	navigation: any,
	//State
	currentUser: Object,
	isUserInfoLoading: boolean,
	isChannelListFetching: boolean,
	isChannelsStatusFetching: boolean,
	isChannelCreating: boolean,
	isMessageListFetching: boolean,
	isChatUserFetching: boolean,
	channelList: Array<Object>,
	myChannels: Array<Object>,
	channelSid: string,
	//Functions
	fetchChannelList: Function,
	createChannel: Function,
	addUserToChannel: Function,
	fetchMessageList: Function,
	sendMessageToChannel: Function,
	fetchChatUser: Function,
	cleanMessageList: Function,
	fetchMessageList: Function,
	updateNumberOfUnread: Function,
	updateLastComsumedMessageIndex: Function,
}
export interface State {}
class ChannelPageContainer extends React.Component<Props, State> {
	componentDidMount(){
		if (this.props.currentUser === null){
			Alert.alert(
				 "Alert",
				 "You must login first to access this page.",
				 [
					 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage",{to: "ChannelPage"})},
					 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
					 {text: "Cancel", style:"cancel"},
				 ]
		 	);
		}
		else {
			this.props.fetchChannelList();
			this.props.fetchMyChannelsStatus(this.props.currentUser.id);
		}
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		!nextProps.isChannelsStatusFetching
		? this.props.fetchMyChannelsStatus(this.props.currentUser.id)
		: null
	}
	getChatUserId = (sid) =>{
		let chatUserId = 0;
		let uniqueName = this.getChannelUniqueNameBySid(sid);
		const userIds = uniqueName.split(':');
		userIds.map(id => {
			if (id != this.props.currentUser.id) chatUserId = id;
		});
		return chatUserId;
	}
	getChannelUniqueNameBySid = (sid) => {
		let uniqueName = "";
		this.props.channelList.map(channel => {
			if (channel.sid === sid) uniqueName = channel.unique_name;
		});
		return uniqueName;
	}
	getChannelFriendlyNameBySid = (sid) => {
		let friendlyName = "";
		this.props.channelList.map(channel => {
			if (channel.sid === sid) friendlyName = channel.friendly_name;
		});
		return friendlyName;
	}
	render() {
		return (
			<ChannelPage
				navigation={this.props.navigation}
				currentUser={this.props.currentUser}
				myChannels={this.props.myChannels}
				getChannelFriendlyNameBySid={this.getChannelFriendlyNameBySid}
				getChatUserId={this.getChatUserId}
				fetchChatUser={this.props.fetchChatUser}
				isChannelListFetching={this.props.isChannelListFetching}
				isChannelsStatusFetching={this.props.isChannelsStatusFetching}
				isChatUserFetching={this.props.isChatUserFetching}
				cleanMessageList={this.props.cleanMessageList}
				fetchMessageList={this.props.fetchMessageList}
				fetchChannelList={this.props.fetchChannelList}
				fetchMyChannelsStatus={this.props.fetchMyChannelsStatus}
				updateLastComsumedMessageIndex={this.props.updateLastComsumedMessageIndex}
			/>
		);
	}
}

bindAction = (dispatch) => {
	return {
		fetchChannelList: () => dispatch( fetchChannelList()),
		fetchMyChannelsStatus: id => dispatch(fetchMyChannelsStatus(id)),
		createChannel: (userA, userB) => dispatch( createChannel(userA, userB)),
		addUserToChannel: (channelSid, username) => dispatch( addUserToChannel(channelSid, username)),
		fetchMessageList: channelSid => dispatch( fetchMessageList(channelSid)),
		sendMessageToChannel: (channelSid, message, username) => dispatch(sendMessageToChannel(channelSid, message, username)),
		fetchChatUser: id => dispatch( fetchChatUser(id)),
		cleanMessageList: () => dispatch(cleanMessageList()),
		fetchMessageList: (sid) => dispatch(fetchMessageList(sid)),
		initialMessageLists: messageLists => dispatch(initialMessageLists(messageLists)),
		updateNumberOfUnread: num => dispatch(updateNumberOfUnread(num)),
		updateLastComsumedMessageIndex: (channelSid, member, index) => dispatch(updateLastComsumedMessageIndex(channelSid, member, index)),
	};
}

const mapStateToProps = state => ({
	isUserInfoLoading: state.loginReducer.isUserInfoLoading,
	currentUser: state.loginReducer.currentUser,
	isChannelListFetching: state.messageReducer.isChannelListFetching,
	isChannelsStatusFetching: state.messageReducer.isChannelsStatusFetching,
	isChannelCreating: state.messageReducer.isChannelCreating,
	isMessageListFetching: state.messageReducer.isMessageListFetching,
	isChatUserFetching: state.messageReducer.isChatUserFetching,
	channelList: state.messageReducer.channelList,
	myChannels: state.messageReducer.myChannels,
	messageLists: state.messageReducer.messageLists,
});
export default connect(mapStateToProps, bindAction)(ChannelPageContainer);
