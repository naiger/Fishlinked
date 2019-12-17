import MessagePage from "../../../stories/screens/Message/MessagePage";
// @flow
import {Body, Header, Left, Right, Title,Button,Icon} from 'native-base';
import * as React from "react";
import {connect} from "react-redux";
import { PushNotificationIOS } from "react-native";
import { addUserToChannel, fetchMessageList, sendMessageToChannel, fetchChatUser, cleanMessageList, updateMessageList, messageIsSending, updateLastComsumedMessageIndex, fetchPreviousPage} from '../actions';
import { MessageContainer, GiftedChat } from 'react-native-gifted-chat';

export interface Props {
	navigation: any,
	//State
	currentUser: Object,
	isMessageListFetching: boolean,
	isChatUserFetching: boolean,
	isMessageSending: boolean,
	messageList: Array<Object>,
	messages: Array<Object>,
	chatUser: Object,
	messageMeta: Object,
	isPreviousMessageFetching: boolean,
	//Functions
	addUserToChannel: Function,
	fetchMessageList: Function,
	sendMessageToChannel: Function,
	cleanMessageList: Function,
	fetchChatUser: Function,
	messageIsSending: Function,
	updateLastComsumedMessageIndex: Function,
}
export interface State {}

class MessagePageContainer extends React.Component<Props, State> {
	// componentDidMount(){
	// 	console.log(this.props.messageMeta);
	// 	this.props.cleanMessageList();
	// 	PushNotificationIOS.addEventListener('notification', (notification) => console.log(notification));
	// }

	UNSAFE_componentWillReceiveProps(nextProps){
		!nextProps.isMessageListFetching || nextProps.isMessageSending
		? (nextProps.fetchMessageList(this.props.navigation.state.params.sid))
		: null
		this.props.messageList.length > 0
		? this.props.messageList.length < nextProps.messageList.length
			? (nextProps.updateLastComsumedMessageIndex(this.props.navigation.state.params.sid, this.props.currentUser.id, nextProps.messageList[(nextProps.messageList.length-1)]._id),
				setTimeout(() => {this._listView.scrollToEnd();}, 100),
				console.log(nextProps.messageList[(nextProps.messageList.length-1)]))
			: null
		: null
	}

  chatUI = () => {
		return (
			<GiftedChat
				messages={this.props.messageList}
				onSend={messages => this.onSend(messages)}
				user={{_id: this.props.currentUser.id}}
				inverted={false}
				alwaysShowSend={true}
				listViewProps={{ref: ref=> this._listView = ref}}
				automaticallyAdjustContentInsets={false}
				loadEarlier={(this.props.messageMeta === null || this.props.messageMeta.previous_page_url === null) ? false : true}
				isLoadingEarlier={this.props.isPreviousMessageFetching}
				onLoadEarlier={()=> this.props.fetchPreviousPage(this.props.messageMeta.previous_page_url,this.props.navigation.state.params.sid)}
			/>
		);
	};

	onSend = (message) => {
		this.props.sendMessageToChannel(
			this.props.navigation.state.params.sid,
			message[0].text,
			this.props.currentUser.id);
	}

	render() {
		return (
			<MessagePage
				navigation={this.props.navigation}
				cleanMessageList={this.props.cleanMessageList}
				currentUser={this.props.currentUser}
				messageList={this.props.messageList}
				chatUI={this.chatUI}
				cleanMessageList={this.props.cleanMessageList}
				isMessageListFetching={this.props.isUserInfoLoading}
				isChatUserFetching={this.props.isChatUserFetching}
				isMessageSending={this.props.isMessageSending}
				fetchMessageList={this.props.fetchMessageList}
				updateLastComsumedMessageIndex={this.props.updateLastComsumedMessageIndex}
			/>
		);
	}
}

bindAction = (dispatch) => {
	return {
		addUserToChannel: (channelSid, username) => dispatch( addUserToChannel(channelSid, username)),
		fetchMessageList: channelSid => dispatch( fetchMessageList(channelSid)),
		sendMessageToChannel: (channelSid, message, username) => dispatch(sendMessageToChannel(channelSid, message, username)),
		fetchChatUser: id => dispatch( fetchChatUser(id)),
		cleanMessageList: () => dispatch( cleanMessageList()),
		updateMessageList: message => dispatch(updateMessageList(message)),
		messageIsSending: bool => dispatch(messageIsSending(bool)),
		fetchPreviousPage: (url, channelSid) => dispatch(fetchPreviousPage(url, channelSid)),
		updateLastComsumedMessageIndex: (channelSid, member, index) => dispatch(updateLastComsumedMessageIndex(channelSid, member, index)),
	};
}

const mapStateToProps = state => ({
	currentUser: state.loginReducer.currentUser,
	isMessageListFetching: state.messageReducer.isMessageListFetching,
	isChatUserFetching: state.messageReducer.isChatUserFetching,
	isMessageSending: state.messageReducer.isMessageSending,
	channelList: state.messageReducer.channelList,
	messageLists: state.messageReducer.messageLists,
	messageList: state.messageReducer.messageList,
	messageMeta: state.messageReducer.messageMeta,
	channelSid: state.messageReducer.channelSid,
	chatUser: state.messageReducer.chatUser,
	tempMessages: state.messageReducer.tempMessages,
	isPreviousMessageFetching: state.messageReducer.isPreviousMessageFetching,
});
export default connect(mapStateToProps, bindAction)(MessagePageContainer);
