import AdDetailPage from "../../../../stories/screens/Market/BuyerPage/AdDetailPage/";
// @flow
import {Body, Button, Header, Icon, Left, Right, Title, Text} from "native-base";
import * as React from "react";
import {updateMyProfile} from '../../../Member/MeStack/actions';
import {addUserToChannel, createChannel, fetchChatUser, fetchMessageList} from '../../../Message/actions';
import {fetchAdImages, adImageIsLoading} from '../../SellerPageContainer/EditAdPageContainer/actions';
import {removeFromLikeList, addToLikeList, fetchSeller} from '../AdListPageContainer/actions';
import styles from "../style";
import { connect } from "react-redux";
import { Alert } from "react-native";
import {openImageViewer} from './actions';
export interface Props {
	navigation: any,
	//state
	likeList: Array<number>,
	userIsValid: boolean,
	likeIsLoading: boolean,
	adImages: Array<string>,
	imagesFetched: number,
	imageIsLoading: boolean,
	seller: Object,
	sellerIsLoading: boolean,
	isViewOpen: boolean,
	imageIndex: number,
	isChannelExisting: boolean,
	channelMembers: number,
	currentUser: Object,
	//Functions
	updateMyProfile: Function,
	addToUserLikeList: Fucntion,
	removeFromUserLikeList: Function,
	fetchAdImages: Function,
	adImageIsLoading: Function,
	fetchSeller:Function,
	openImageViewer: Function,
	createChannel: Function,
	addUserToChannel: Function,
	fetchChatUser: Function,
	fetchMessageList: Function,
}
export interface State {}
class AdDetailPageContainer extends React.Component<Props, State> {
	//change like status of the particular product
	//add or remove product id from userLikeList
	likeHandler = (id) => {
		const fields = new Object;
		const data = new Object;
		data.fields = fields;
		if (this.props.userIsValid){
			if (this.props.likeList.includes(id)){
				this.props.removeFromLikeList(id);
				fields.likes = this.props.likeList;
			}
			else {
				this.props.addToLikeList(id);
				fields.likes = [...this.props.likeList, id];
			}
			this.props.updateMyProfile(data);
			this.forceUpdate();
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
			alert("This is your own ad")};
	}
	componentDidMount(){
		const param = this.props.navigation.state.params;
		this.props.fetchSeller(param.ad.seller);
		if (param.ad.images.length > 0){
			param.ad.images.map((image, i) => this.props.fetchAdImages(image, i));
		}
		else this.props.adImageIsLoading(false);
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		const param = this.props.navigation.state.params;
		if (param.ad.images.length === nextProps.imagesFetched){
			nextProps.adImageIsLoading(false);
		}
		if (nextProps.channelMembers === 2 || nextProps.isChannelExisting){
			if (nextProps.channel != null){
				nextProps.fetchMessageList(nextProps.channel.sid);
				nextProps.navigation.navigate("MessagePage",{sid: nextProps.channel.sid, friendlyName: nextProps.channel.friendly_name});
			}
		}
	}
	getImageUrls = () =>{
		let imageUrls = [];
		this.props.adImages.length > 0
		? this.props.adImages.map((image, i)=> {
			imageUrls.push({"url":image});
		})
		: null
		console.log(imageUrls);
		return imageUrls;
	}
	render() {
		return (
			<AdDetailPage
				navigation={this.props.navigation}
				likeIsLoading={this.props.likeIsLoading}
				likeList={this.props.likeList}
				likeHandler={this.likeHandler}
				adImages={this.props.adImages}
				imageIsLoading={this.props.imageIsLoading}
				userIsValid={this.props.userIsValid}
				seller={this.props.seller}
				sellerIsLoading={this.props.sellerIsLoading}
				isViewOpen={this.props.isViewOpen}
				imageIndex={this.props.imageIndex}
				openImageViewer={this.props.openImageViewer}
				getImageUrls={this.getImageUrls}
				enterChannel={this.enterChannel}
				currentUser={this.props.currentUser}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		updateMyProfile: data => dispatch( updateMyProfile(data)),
		addToLikeList: id => dispatch( addToLikeList(id)),
		removeFromLikeList: id => dispatch( removeFromLikeList(id)),
		fetchAdImages:(image, index) => dispatch( fetchAdImages(image, index)),
		adImageIsLoading: bool => dispatch( adImageIsLoading(bool)),
		fetchSeller: sellerId => dispatch( fetchSeller(sellerId)),
		openImageViewer: (bool, index) => dispatch( openImageViewer(bool, index)),
		addUserToChannel: (sid, id) => dispatch(addUserToChannel(sid,id)),
		createChannel: (seller, currentUser) => dispatch(createChannel(seller, currentUser)),
		fetchChatUser: id => dispatch( fetchChatUser(id)),
		fetchMessageList: sid => dispatch(fetchMessageList(sid)),
	};
}

const mapStateToProps = state => ({
	likeList: state.adListReducer.likeList,
	userIsValid: state.loginReducer.userIsValid,
	likeIsLoading: state.adListReducer.likeIsLoading,
	imagesFetched: state.editAdReducer.imagesFetched,
	adImages: state.editAdReducer.adImages,
	imageIsLoading: state.editAdReducer.imageIsLoading,
	seller: state.adListReducer.seller,
	sellerIsLoading: state.adListReducer.sellerIsLoading,
	isViewOpen: state.adDetailReducer.isViewOpen,
	imageIndex: state.adDetailReducer.imageIndex,
	currentUser: state.loginReducer.currentUser,
	channelMembers: state.messageReducer.channelMembers,
	isChannelExisting: state.messageReducer.isChannelExisting,
});

export default connect(mapStateToProps, bindAction)(AdDetailPageContainer);
