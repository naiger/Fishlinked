import MyAdsListPage from "../../../../stories/screens/Market/SellerPage/MyAdsListPage";
import {fetchLikeList} from '../../BuyerPageContainer/AdListPageContainer/actions';
import {fetchAdImages, initialAdImages} from '../EditAdPageContainer/actions';
import {initialProductName, initialProductDescription} from '../EditDescriptionPageContainer/actions';
import { fetchMyAdsList, itemRemove, removeAd } from "./actions";
import styles from './styles';
// @flow
import {Body, Header, Left, Right, Title, Button, Icon, Text, View, Badge} from "native-base";
import * as React from "react";
import {connect} from "react-redux";

export interface Props {
	navigation: any,
	//state
	myAds: Array<Object>,
	myAdsIsLoading: boolean,
	myAdsError: Object,
	del: boolean,
	removeAd: number,
	currentUser: Object,
	//Funcitons
	fetchMyAdsList: Function,
	itemRemove: Function,
	removeAd: Function,
	fetchAdImages: Function,
	initialAdImages: Function,
	initialProductName: Function,
	initialProductDescription: Function,
	fetchLikeList: Function,
}
export interface State {}
class MyAdsListContainer extends React.Component<Props, State> {

	componentDidMount() {
		this.props.fetchMyAdsList(this.props.currentUser.id);
	}
	UNSAFT_componentWillReceiveProps(nextProps){
		nextProps.currentUser.id != this.props.currentUser.id
		? this.props.fetchMyAdsList(nextProps.currentUser.id) : null
	}
	deleteButton = () =>{
		return (
			<Button transparent style={styles.remove} onPress={this.props.itemRemove}>
				{
					this.props.del
					? <Text>Done</Text>
					: <Icon name="remove"/>
				}
				</Button>
		);
	}

	render() {
		return (
			<MyAdsListPage
				myAdsIsLoading={this.props.myAdsIsLoading}
				navigation={this.props.navigation}
				myAds={this.props.myAds}
				del={this.props.del}
				deleteButton={this.deleteButton()}
				removeAd={this.props.removeAd.bind(this)}
				fetchAdImages={this.props.fetchAdImages}
				initialAdImages={this.props.initialAdImages}
				initialProductName={this.props.initialProductName}
				initialProductDescription={this.props.initialProductDescription}
				currentUser={this.props.currentUser}
				fetchLikeList={this.props.fetchLikeList}
				fetchMyAdsList={this.props.fetchMyAdsList}
			/>
		);
	}
}
bindAction = (dispatch) => {
	return {
		fetchMyAdsList: id => dispatch( fetchMyAdsList(id)),
		itemRemove: boolean => dispatch(itemRemove()),
		removeAd: (userId, adId) => dispatch( removeAd(userId, adId)),
		fetchAdImages : image => dispatch( fetchAdImages(image)),
		initialAdImages: length => dispatch( initialAdImages(length)),
		initialProductName: name => dispatch( initialProductName(name)),
		initialProductDescription: description => dispatch( initialProductDescription(description)),
		fetchLikeList: list => dispatch( fetchLikeList()),
	};
}

const mapStateToProps = state => ({
	myAds: state.myAdListReducer.myAds,
	myAdsIsLoading: state.myAdListReducer.myAdsIsLoading,
	myAdsError: state.myAdListReducer.myAdsError,
	del: state.myAdListReducer.del,
	removedAd: state.myAdListReducer.removedAd,
	currentUser: state.loginReducer.currentUser,
});

export default connect(mapStateToProps, bindAction)(MyAdsListContainer);
