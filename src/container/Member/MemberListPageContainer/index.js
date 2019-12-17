import MemberListPage from "../../../stories/screens/Member/MemberListPage";
// @flow
import {createChannel, addUserToChannel, fetchChatUser, fetchMessageList} from '../../Message/actions';
import {fetchMemberList, startSearchMember, stopSearchMember, searchMember, setSearchMemberKeyword, searchMemberSuccess} from "./actions";
import {Body, Header, Left, Right, Title, Button,Icon} from 'native-base';
import * as React from "react";
import { connect } from "react-redux";

export interface Props {
	navigation: any,
	//State
	memberList: Array<Object>,
	memberListError: Object,
	memberListIsLoading: boolean,
	list: Array<Object>,
	isSearch: boolean,
	searchResult: Array<Object>,
	searchMembeKeyword: string,
	memberListIsSearching: boolean,
	currentUser: Object,
	isChannelExisting: boolean,
	channelMembers: number,
	channel: Object,
	//Functions
	fetchMemberList: Function,
	startSearchMember: Function,
	stopSearchMember: Function,
	searchMember: Funciton,
	setSearchMemberKeyword: Funciton,
	searchMemberSuccess: Function,
	createChannel: Function,
	addUserToChannel: Function,
	fetchChatUser: Function,
	fetchMemberList: Function,
}
export interface State {}
class MemberListPageContainer extends React.Component<Props, State> {
	//should call by category
	componentDidMount() {
		this.props.fetchMemberList();
	}
	enterChannel = async(member) =>{
		if (member.id != this.props.currentUser.id) {
			this.props.fetchChatUser(member.id);
			let channel = await this.props.createChannel(member, this.props.currentUser);
			if (!this.props.isChannelExisting){
				this.props.addUserToChannel(channel.sid, member.id);
				this.props.addUserToChannel(channel.sid, this.props.currentUser.id);
			}
		}
		else {
			alert("You cannot chat with yourself.");
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
			<MemberListPage
				navigation={this.props.navigation}
				memberList={this.props.memberList}
				memberListIsLoading={this.props.memberListIsLoading}
				memberListError={this.props.memberListError}
				list={this.props.list}
				isSearch={this.props.isSearch}
				memberListIsSearching={this.props.memberListIsSearching}
				searchMembeKeyword={this.props.searchMembeKeyword}
				searchResult={this.props.searchResult}
				startSearchMember={this.props.startSearchMember}
				stopSearchMember={this.props.stopSearchMember}
				searchMember={this.props.searchMember}
				setSearchMemberKeyword={this.props.setSearchMemberKeyword}
				enterChannel={this.enterChannel}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		fetchMemberList: options => dispatch( fetchMemberList(options)),
		startSearchMember: isSearch => dispatch( startSearchMember(isSearch)),
		stopSearchMember: isSearch => dispatch( stopSearchMember(isSearch)),
		searchMember: name => dispatch( searchMember(name)),
		setSearchMemberKeyword: keyword => dispatch( setSearchMemberKeyword(keyword)),
		searchMemberSuccess: searchResult => dispatch( searchMemberSuccess(searchResult)),
		createChannel: (seller, currentUser) => dispatch(createChannel(seller, currentUser)),
		addUserToChannel: (sid, id) => dispatch(addUserToChannel(sid,id)),
		fetchChatUser: id => dispatch( fetchChatUser(id)),
		fetchMessageList: sid => dispatch(fetchMessageList(sid)),
	};
}

const mapStateToProps = state => ({
	memberList: state.memberListReducer.memberList,
	memberListIsLoading: state.memberListReducer.memberListIsLoading,
	memberListError: state.memberListReducer.memberListError,
	isSearch: state.memberListReducer.isSearch,
	searchResult: state.memberListReducer.searchResult,
	searchMembeKeyword: state.memberListReducer.searchMembeKeyword,
	memberListIsSearching: state.memberListReducer. memberListIsSearching,
	list: state.catchReducer.list,
	currentUser: state.loginReducer.currentUser,
	channel: state.messageReducer.channel,
	channelMembers: state.messageReducer.channelMembers,
	isChannelExisting: state.messageReducer.isChannelExisting,
});

export default connect(mapStateToProps, bindAction)(MemberListPageContainer);
