
import config from "./config";
import axios from "axios";

export function enterChannel(sid: string){
	return{
		type: "ENTER_CHANNEL",
		sid,
	};
}
export function channelIsCreating(bool: boolean){
	return{
		type: "CHANNEL_IS_CREATING",
		isCreating: bool,
	};
}
export function createChannelSuccess(channel: Object){
	return{
		type: "CREATE_CHANNEL_SUCCESS",
		channel,
	};
}
export function channelListIsFetching(bool: boolean){
	return{
		type: "CHANNEL_LIST_IS_FETCHING",
		isFetching: bool,
	};
}
export function fetchChannelListSuccess(channelList: Array<Object>){
	return{
		type: "FETCH_CHANNEL_LIST_SUCCESS",
		channelList,
	};
}
export function fetchMyChannelsStatusSuccess(myChannels: Array<Object>){
	return{
		type: "FETCH_MY_CHANNELS_STATUS_SUCCESS",
		myChannels,
	};
}
export function channelsStatusIsFetching (bool: boolean){
	return{
		type: "CHANNELS_STATUS_IS_FETCHING",
		isFetching: bool,
	};
}
export function channelIsFetching(bool: boolean){
	return{
		type: "CHANNEL_IS_FETCHING",
		isFetching: bool,
	};
}
export function fetchChannelSuccess(channel: Object){
	return{
		type: "FETCH_CHANNEL_SUCCESS",
		channel,
	};
}
export function initialMessageLists(messageLists: Object){
	return{
		type: "INITIAL_MESSAGE_LISTS",
		messageLists,
	};
}
export function messageListIsFetching(bool: boolean){
	return{
		type: "MESSAGE_LIST_IS_FETCHING",
		isFetching: bool,
	};
}
export function fetchMessageListSuccess(message: Object, channel: string){
	return{
		type: "FETCH_MESSAGE_LIST_SUCCESS",
		messageList: message.messages,
		meta: message.meta,
		channel,
	};
}
export function fetchChatUserSuccess(user: Object){
	return {
		type: "FTECH_CHAT_USER_SUCCESS",
		user,
	};
}
export function chatUserIsFetching(bool: boolean){
	return {
		type: "CHAT_USER_IS_FETCHING",
		bool,
	};
}
export function addUserToChannelSuccess(){
	return {
		type: "ADD_USER_TO_CHANNEL_SUCCESS",
	};
}
export function channelIsExisting(bool: boolean){
	return {
		type: "CHANNEL_IS_EXISTING",
		bool,
	};
}
export function cleanMessageList(){
	return {
		type: "CLEAN_MESSAGE_LIST",
	};
}
export function messageIsSending (bool: boolean) {
	return {
		type: "MESSAGE_IS_SENDING",
		isSending: bool,
	}
}
export function sendMessageError (error: string) {
	return {
		type: "SEND_MESSAGE_ERROR",
		error,
	}
}
export function updateMessageList (message: Object){
	return {
		type: "UPDATE_MESSAGE_LIST",
		message,
	}
}
export function updateNumberOfUnread (num?: number){
	return {
		type: "UPDATE_NUMBER_OF_UNREAD",
		num,
	}
}
export function fetchPreviousPageSuccess (message: Object){
	return {
		type: "FETCH_PREVIOUS_PAGE_SUCCESS",
		messageList: message.messages,
		meta: message.meta,
	}
}
export function previousMessagesIsFetching (bool: boolean) {
	return {
		type: "PREVIOUS_MESSAGES_IS_FETCHING",
		bool,
	}
}
//complete
export function fetchChatUser(id: string){
	const userLink = "/wp-json/wp/v2/users/"+id
	return (dispatch: Function) => {
		dispatch(chatUserIsFetching(true));
		return axios.get(userLink)
		.then(response => {
			dispatch(fetchChatUserSuccess(response.data));
			dispatch(chatUserIsFetching(false));
		}).catch(error=> {
			console.log(error);
			dispatch(chatUserIsFetching(false));
		});
	}
}
//complete
export function connectFishLinkedChat () {
	const twilioUrl = "https://chat.twilio.com/v2/Services/";
	const instance = axios.create({
		baseURL: twilioUrl+config.tokenGenerator.serviceSid,
		auth: {
			username: config.tokenGenerator.signingKeySid,
			password: config.tokenGenerator.signingKeySecret,
		},
		headers:{
			'Content-Type': 'multipart/form-data',
		}
	});
	return instance;
}
//complete
export function fetchChannelList(){
	const instance = connectFishLinkedChat();
	return (dispatch: Function) => {
		dispatch(channelListIsFetching(true));
		return instance.get("Channels")
		.then(response => {
			dispatch(fetchChannelListSuccess(response.data.channels));
			dispatch(channelListIsFetching(false));
		}).catch(error=> {
			console.log(error.response.data.detail);
			dispatch(channelListIsFetching(false));
		});
	}
}
//complete
export function fetchMyChannelsStatus(id: number){
	const instance = connectFishLinkedChat();
	const myChannelsLink = "Users/"+id+"/Channels"
	return (dispatch: Function) => {
		dispatch(channelsStatusIsFetching(true));
		return instance.get(myChannelsLink)
		.then(response => {
			dispatch(fetchMyChannelsStatusSuccess(response.data.channels));
			dispatch(updateNumberOfUnread());
			dispatch(channelsStatusIsFetching(false));
		}).catch(error=> {
			console.log(error.response.data.detail);
			dispatch(channelsStatusIsFetching(false));
		});
	}
}
//complete
export function fetchChannelByUniqueName(uniqueName: string) {
	const instance = connectFishLinkedChat();
	const channelLink = "Channels/"+uniqueName;
	return (dispatch: Function) => {
		dispatch(channelIsFetching(true));
		return instance.get(channelLink)
		.then(response => {
			dispatch(fetchChannelSuccess(response.data));
			dispatch(channelIsFetching(false));
			return response.data;
		}).catch(error=> {
			console.log(error.response.data.detail);
			dispatch(channelIsFetching(false));
		});
	}
}
//called after login
export function createTwilioUser(user: Object){
	const instance = connectFishLinkedChat();
	const userId = user.id;
	const params = new FormData();
	params.append("Identity", userId);
	params.append("FriendlyName", user.nickname);
	return (dispatch: Function) => {
		return instance.post("Users", params, {
			headers:{
			'Content-Type': 'multipart/form-data',
		}})
		.then(response => {
			console.log(response.data);
			dispatch(fetchMyChannelsStatus(userId));
		}).catch(error=>{
			console.log(error.response.data.message);
			error.response.data.code === 50201
			? dispatch(fetchMyChannelsStatus(userId)): null
		});
	}
}
//complete
export function createChannel(seller: Object, currentUser: Object){
	const instance = connectFishLinkedChat();
	const params = new FormData();
	const friendlyName = [seller.nickname, currentUser.nickname].sort().join("-");
	const uniqueName = [seller.ID === undefined ? seller.id : seller.ID, currentUser.id].sort().join(":")
	params.append("FriendlyName", friendlyName);
	params.append("Type","private");
	params.append("UniqueName", uniqueName);
	console.log(params);
	return (dispatch: Function) => {
		dispatch(channelIsExisting(false));
		dispatch(channelIsCreating(true));
		return instance.post("Channels",params)
		.then(response => {
			console.log(response.data);
			dispatch(createChannelSuccess(response.data));
			dispatch(channelIsCreating(false));
			return response.data;
		}).catch(error=>{
			error.response.data.status === 409
			? (dispatch(fetchChannelByUniqueName(uniqueName)),
				dispatch(channelIsExisting(true)))
			: console.log(error.response.data.message)
			dispatch(channelIsCreating(false));
		});
	}
}
//complete
export function addUserToChannel(channelSid: string, id: string){
	const instance = connectFishLinkedChat();
	const url = "Channels/"+channelSid+"/Members/";
	const params = new FormData();
	params.append("Identity", id);
	return (dispatch: Function) => {
		return instance.post(url ,params)
		.then(response => {
			dispatch(addUserToChannelSuccess());
			console.log(response.data);
		})
		.catch(error=>console.log(error));
	}
}
//complete
export function fetchMessageList(channelSid: string, clean?: boolean){
	const instance = connectFishLinkedChat();
	if (clean) dispatch(cleanMessageList());
	const url = "Channels/"+channelSid+"/Messages/";
	return (dispatch: Function) => {
		dispatch(messageListIsFetching(true));
		dispatch(messageIsSending(false));
		return instance.get(url).then(response => {
			response.data.meta.next_page_url
			? dispatch(fetchNextPage(response.data.meta.next_page_url, channelSid))
			: (dispatch(fetchMessageListSuccess(response.data, channelSid)),
			dispatch(messageListIsFetching(false)))
		}).catch(error=>{
			//console.log(error.response.data.message);
			dispatch(messageListIsFetching(false));
		});
	}
}
export function fetchPreviousPage(url: string, channelSid: string){
	const instance = axios.create({
		baseURL: url,
		auth: {
			username: config.tokenGenerator.signingKeySid,
			password: config.tokenGenerator.signingKeySecret,
		},
	});
	return (dispatch: Function)=>{
		dispatch(previousMessagesIsFetching(true));
		return instance.get().then(response => {
			console.log(response.data)
			dispatch(fetchPreviousPageSuccess(response.data));
			dispatch(previousMessagesIsFetching(false));
		}).catch(error=>{
			console.log(error.response.data);
			dispatch(previousMessagesIsFetching(false));
		});
	}
}
export function fetchNextPage(url: string, channelSid: string){
	const instance = axios.create({
		baseURL: url,
		auth: {
			username: config.tokenGenerator.signingKeySid,
			password: config.tokenGenerator.signingKeySecret,
		},
	});
	return (dispatch: Function)=>{
		return instance.get().then(response => {
			response.data.meta.next_page_url
			? (dispatch(fetchNextPage(response.data.meta.next_page_url, channelSid)))
			: (dispatch(fetchMessageListSuccess(response.data, channelSid)),
				dispatch(messageListIsFetching(false)))
		}).catch(error=>{
			//console.log(error.response.data);
			dispatch(messageListIsFetching(false));
		});
	}
}
//complete
export function sendMessageToChannel(channelSid: string, message: string, id: string){
	const instance = connectFishLinkedChat();
	const sid = channelSid;
	const url = "Channels/"+sid+"/Messages/";
	let params = new FormData();
	params.append("Body", message);
	params.append("From", id);
	console.log(params);
	return (dispatch: Function) => {
		dispatch(messageIsSending(true));
		return instance.post(url ,params)
		.then(response => {
			console.log(response.data);
			dispatch(updateLastComsumedMessageIndex(response.data.channel_sid, response.data.from ,response.data.index));
			dispatch(messageIsSending(false));
		})
		.catch(error=>{
			console.log(error.response.data);
			dispatch(sendMessageError(error.response.data.detail));
			dispatch(messageIsSending(false));
		});
	}
}
//need to be tested
export function updateLastComsumedMessageIndex(channelSid: string, member: string, index: number){
	const instance = connectFishLinkedChat();
	const url = "Channels/"+channelSid+"/Members/"+member;
	let params = new FormData();
	params.append("LastConsumedMessageIndex", index);
	console.log(params);
	return (dispatch: Function) => {
		return instance.post(url ,params)
		.then(response => {
			console.log(response.data);
			dispatch(fetchMyChannelsStatus(response.data.identity))
		})
		.catch(error=>{
			console.log(error.response);
		});
	}
}
