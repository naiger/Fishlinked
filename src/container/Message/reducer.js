// @flow
const initialState = {
	isChannelListFetching: true,
	isChannelsStatusFetching: false,
	isChannelCreating: false,
	isMessageListFetching: true,
	isChatUserFetching: true,
	isChannelExisting: false,
	isChannelFetching: false,
	isMessageSending: false,
	channelList: [],
	myChannels: [],
	messageList: [],
	messageMeta: null,
	messageLists: {},
	channel: null,
	chatUser: null,
	channelMembers: 0,
	messageError: null,
	numberOfUnread: 0,
	tempMessages: [],
	isPreviousMessageFetching: false,
};

export default function(state: any = initialState, action: Function) {
	switch (action.type) {
		//Channel
		case "CHANNEL_LIST_IS_FETCHING":{
			return {
				...state,
				isChannelListFetching: action.isFetching,
			};
			break;
		}
		case "FETCH_CHANNEL_LIST_SUCCESS":{
			return {
				...state,
				channelList: action.channelList,
			};
			break;
		}
		case "FETCH_MY_CHANNELS_STATUS_SUCCESS":{
			return {
				...state,
				myChannels: action.myChannels,
			};
			break;
		}
		case "CHANNELS_STATUS_IS_FETCHING":{
			return {
				...state,
				isChannelsStatusFetching: action.isFetching,
			};
			break;
		}
		case "CHANNEL_IS_FETCHING":{
			return {
				...state,
				isChannelFetching: action.isFetching,
			};
			break;
		}
		case "FETCH_CHANNEL_SUCCESS":{
			return {
				...state,
				channel: action.channel,
			};
			break;
		}
		case "CHANNEL_IS_CREATING":{
			return {
				...state,
				isChannelCreating: action.isCreating,
			};
			break;
		}
		case "CREATE_CHANNEL_SUCCESS":{
			return {
				...state,
				channel: action.channel,
			};
			break;
		}
		//Messages
		case "MESSAGE_LIST_IS_FETCHING":{
			return {
				...state,
				isMessageListFetching: action.isFetching,
			};
			break;
		}
		case "INITIAL_MESSAGE_LISTS":{
			return {
				...state,
				messageLists: action.messageLists,
			}
		}
		case "FETCH_MESSAGE_LIST_SUCCESS":{
			let messages = [];
			let avatar = state.chatUser? state.chatUser.avatar_urls["24"]: null;
			action.messageList.map((m, i) =>{
				let message = new Object;
				let user = new Object;
				user._id = parseInt(m.from, 10);
				user.avatar = avatar;
				message._id = parseInt(m.index, 10);
				message.text = m.body;
				message.createdAt = m.date_created;
				message.user = user;
				messages.push(message);
			});
			state.messageLists[action.channel] = messages;
			if (state.messageList.length > 0) {
				let newMessages = [];
				messages.map(message => {
					if (!(state.messasgeList.indexOf(message) > -1)){
						newMessages.push(message);
						console.log(message);
					}
				});
				return {
					...state,
					messageList: state.messageList.concat(newMessages),
					messageMeta: action.meta,
					messageError: null,
				}
			}
			else return {
				...state,
				messageList: messages,
				messageMeta: action.meta,
				messageError: null,
			};
			break;
		}
		case "ENTER_CHANNEL":{
			return {
				...state,
				channel: action.channel,
			};
			break;
		}
		case "FTECH_CHAT_USER_SUCCESS":{
			return {
				...state,
				chatUser: action.user,
			};
			break;
		}
		case "CHAT_USER_IS_FETCHING":{
			return {
				...state,
				isChatUserFetching: action.bool,
			};
			break;
		}
		case "ADD_USER_TO_CHANNEL_SUCCESS":{
			return {
				...state,
				channelMembers: state.channelMembers +1,
			};
			break;
		}
		case "CLEAN_MESSAGE_LIST":{
			return {
				...state,
				messageList: [],
				messageMeta: null,
				messageError: null,
				channelMembers: 0,
				isChannelExisting: false,
				chatUser: null,
			};
			break;
		}
		case "CHANNEL_IS_EXISTING":{
			return {
				...state,
				isChannelExisting: action.bool,
			};
			break;
		}
		case "MESSAGE_IS_SENDING":{
			return {
				...state,
				isMessageSending: action.isSending,
			};
			break;
		}
		case "SEND_MESSAGE_ERROR":{
			return {
				...state,
				messageError: action.error,
			};
			break;
		}
		case "UPDATE_MESSAGE_LIST":{
			return {
				...state,
				messageList: [...state.messageList, action.message],
			};
			break;
		}
		case "UPDATE_NUMBER_OF_UNREAD": {
			let number = 0;
			state.myChannels.map(channel => number += channel.unread_messages_count)
			return {
				...state,
				numberOfUnread: number,
			};
			break;
		}
		case "FETCH_PREVIOUS_PAGE_SUCCESS": {
			let messages = [];
			action.messageList.map((m, i) =>{
				let message = new Object;
				let user = new Object;
				user._id = parseInt(m.from, 10);
				user.avatar = state.chatUser ? state.chatUser.avatar_urls["24"]: null;
				message._id = parseInt(m.index, 10);
				message.text = m.body;
				message.createdAt = m.date_created;
				message.user = user;
				messages.push(message);
			});
			return {
				...state,
				messageList: messages.concat(state.messageList),
				messageMeta: action.meta,
			}
			break;
		}
		case "PREVIOUS_MESSAGES_IS_FETCHING": {
			return {
				...state,
				isPreviousMessageFetching: action.bool,
			};
			break;
		}
	}
	return state;
}
