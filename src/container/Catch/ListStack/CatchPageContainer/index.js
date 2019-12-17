import CatchPage from "../../../../stories/screens/Catch/ListStack/CatchPage";
import ListPage from "../../../../stories/screens/Catch/ListStack/ListPage";
// @flow
import {createChannel, addUserToChannel, fetchChatUser, fetchMessageList} from '../../../Message/actions';
import {fetchList, openPhotoViewer} from './actions';
import {Body, Header, Left, Right, Title, Button, Icon, Text} from 'native-base';
import * as React from "react";
import { connect } from "react-redux";

export interface Props {
	navigation: any,
	//State
	isOpen: boolean,
	photoIndex: number,
	currentUser: Object,
	isChannelExisting: boolean,
	channelMembers: number,
	channel: Object,
	//Functions
	openPhotoViewer: Function,
	createChannel: Function,
	addUserToChannel: Function,
	fetchChatUser: Function,
	fetchMemberList: Function,
}
export interface State {}
class CatchPageContainer extends React.Component<Props, State> {
	getPhotoUrls = () =>{
		let imageUrls = [];
		this.props.navigation.state.params.catch.acf.gallery
		? this.props.navigation.state.params.catch.acf.gallery.map((image, i)=> {
			imageUrls.push({"url":image.url.toString()});
		})
		: null
		console.log(imageUrls);
		return imageUrls;
	}
	enterChannel = async (author) => {
		const catchAuthor = new Object;
		catchAuthor.id = author;
		console.log(author);
		if (author != this.props.currentUser.id) {
			this.props.fetchChatUser(author);
			let channel = await this.props.createChannel(catchAuthor, this.props.currentUser);
			if (!this.props.isChannelExisting){
				this.props.addUserToChannel(channel.sid, author);
				this.props.addUserToChannel(channel.sid, this.props.currentUser.id);
			}
		}
		else {
			alert("This is your own catch.")
		};
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		if (nextProps.channelMembers === 2 || nextProps.isChannelExisting){
			if (nextProps.channel != null){
				nextProps.fetchMessageList(nextProps.channel.sid);
				nextProps.navigation.navigate("MessagePage",{sid: nextProps.channel.sid, friendlyName: nextProps.channel.friendly_name});
			}
		}
	}
	render() {
		return (
			<CatchPage
				navigation={this.props.navigation}
				isOpen={this.props.isOpen}
				photoIndex={this.props.photoIndex}
				currentUser={this.props.currentUser}
				openPhotoViewer={this.props.openPhotoViewer}
				getPhotoUrls={this.getPhotoUrls}
				enterChannel={this.enterChannel}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		openPhotoViewer: (bool, index) => dispatch(openPhotoViewer(bool, index)),
		createChannel: (seller, currentUser) => dispatch(createChannel(seller, currentUser)),
		addUserToChannel: (sid, id) => dispatch(addUserToChannel(sid,id)),
		fetchChatUser: id => dispatch( fetchChatUser(id)),
		fetchMessageList: sid => dispatch(fetchMessageList(sid)),
	};
}

const mapStateToProps = state => ({
	isOpen: state.catchDetailReducer.isOpen,
	photoIndex: state.catchDetailReducer.photoIndex,
	currentUser: state.loginReducer.currentUser,
	channel: state.messageReducer.channel,
	channelMembers: state.messageReducer.channelMembers,
	isChannelExisting: state.messageReducer.isChannelExisting,
});

export default connect (mapStateToProps, bindAction)(CatchPageContainer);
