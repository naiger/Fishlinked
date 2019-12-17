import AdListPage from "../../../../stories/screens/Market/BuyerPage/AdListPage";
import {updateMyProfile} from '../../../Member/MeStack/actions';
import {createChannel, addUserToChannel, cleanChannelMember, fetchChatUser, fetchMessageList} from '../../../Message/actions';
import {initialAdImages} from '../../SellerPageContainer/EditAdPageContainer/actions';
import styles from '../style';
import {fetchAdList, removeFromLikeList, addToLikeList, fetchLikeList, enableAdsSearch, setAdsSearchKeyword, adListIsLoading, initialLikeList } from './actions';
import {Body, Button, Header, Icon, Left, Right, Title, Text} from "native-base";
// @flow
import { Alert } from "react-native";
import * as React from "react";
import { connect } from "react-redux";

export interface Props {
	//state
	navigation: any,
	adList: Array<Object>,
	adsIsLoading: boolean,
	adListError: Object,
	likeList: Array<number>,
	userIsValid: boolean,
	likeIsLoading: boolean,
	adsIsSearching: boolean,
	currentUser: Object,
	isChannelExisting: boolean,
	channelMembers: number,
	//Functions
	fetchAdList: Function,
	updateMyProfile: Function,
	addToLikeList: Fucntion,
	removeFromLikeList: Function,
	initialAdImages: Funciton,
	enableAdsSearch: Function,
	createChannel: Function,
	addUserToChannel: Function,
	fetchChatUser: Function,
	fetchMessageList: Function,
}
export interface State {}
class AdListPageContainer extends React.Component<Props, State> {
	//change like status of the particular product
	//add or remove product id from LikeList
	likeHandler = (id) => {
		const fields = new Object;
		const data = new Object;
		data.fields = fields;
		if (this.props.userIsValid){
			console.log(this.props.likeList);
			if (this.props.likeList.includes(id)){
				this.props.removeFromLikeList(id);
				fields.likes = this.props.likeList;
				console.log(data);
			}
			else {
				this.props.addToLikeList(id);
				fields.likes = [...this.props.likeList, id];
				console.log(data);
			}
			this.props.updateMyProfile(data);
		}
		else {
			Alert.alert(
				 "Alert",
				 "You must login first to enable this function.",
				 [
					 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage", {from: "BuyerPage", to: "BuyerPage"})},
					 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
					 {text: "Cancel", style:"cancel"},
				 ]
		 	);
		}
	}
	enterChannel = async (seller) => {
		if (seller.ID != this.props.currentUser.id) {
			this.props.fetchChatUser(seller.ID);
			let channel = await this.props.createChannel(seller, this.props.currentUser);
			if (!this.props.isChannelExisting){
				this.props.addUserToChannel(channel.sid, seller.ID);
				this.props.addUserToChannel(channel.sid, this.props.currentUser.id);
			}
		}
		else {
			alert("This is your own advertisement.")
		};
	}
	searchAds = (text) => {
		text
		?	this.props.fetchAdList({
				categories: this.props.navigation.state.params.id,
				search: text
			})
		: this.props.fetchAdList({categories: this.props.navigation.state.params.id})
	}
	componentDidMount() {
		this.props.fetchAdList({
			categories: this.props.navigation.state.params.id
		});
		this.props.userIsValid
		? this.props.fetchLikeList()
		:	this.props.initialLikeList([],false);
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
			<AdListPage
				navigation={this.props.navigation}
				adList={this.props.adList}
				adsIsLoading={this.props.adsIsLoading}
				likeIsLoading={this.props.likeIsLoading}
				likeList={this.props.likeList}
				likeHandler={this.likeHandler}
				initialAdImages={this.props.initialAdImages}
				userIsValid={this.props.userIsValid}
				adsIsSearching={this.props.adsIsSearching}
				enableAdsSearch={this.props.enableAdsSearch}
				setAdsSearchKeyword={this.props.setAdsSearchKeyword}
				searchAds={this.searchAds}
				fetchAdList={this.props.fetchAdList}
				enterChannel={this.enterChannel}
				currentUser={this.props.currentUser}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		fetchAdList: options => dispatch ( fetchAdList(options)),
		fetchLikeList: likes => dispatch( fetchLikeList()),
		updateMyProfile: data => dispatch(updateMyProfile(data)),
		addToLikeList: id => dispatch( addToLikeList(id)),
		removeFromLikeList: id => dispatch( removeFromLikeList(id)),
		initialAdImages: length => dispatch( initialAdImages(length)),
		enableAdsSearch: bool => dispatch( enableAdsSearch(bool)),
		createChannel: (seller, currentUser) => dispatch(createChannel(seller, currentUser)),
		addUserToChannel: (sid, id) => dispatch(addUserToChannel(sid,id)),
		cleanChannelMember: member => dispatch(cleanChannelMember()),
		fetchChatUser: id => dispatch( fetchChatUser(id)),
		fetchMessageList: sid => dispatch(fetchMessageList(sid)),
		initialLikeList: (likeList, bool) => dispatch(initialLikeList(likeList, bool)),
	};
}

const mapStateToProps = state => ({
	adList: state.adListReducer.adList,
	adsIsLoading: state.adListReducer.adsIsLoading,
	adListError: state.adListReducer.adListError,
	likeList: state.adListReducer.likeList,
	userIsValid: state.loginReducer.userIsValid,
	currentUser: state.loginReducer.currentUser,
	likeIsLoading: state.adListReducer.likeIsLoading,
	adsIsSearching: state.adListReducer.adsIsSearching,
	channelMembers: state.messageReducer.channelMembers,
	channel: state.messageReducer.channel,
	isChannelExisting: state.messageReducer.isChannelExisting,
});


export default connect (mapStateToProps, bindAction)(AdListPageContainer);
