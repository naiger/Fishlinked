import MePage from "../../../../stories/screens/Member/Me/MePage";
// @flow
import {Body, Header, Left, Right, Title,Icon,Button,Text, Spinner, ListItem, View} from "native-base";
import * as React from "react";
import {connect} from "react-redux";
import {Alert} from "react-native";
import {logout, fetchCurrentUser} from '../../../Auth/LoginPageContainer/actions';
import {isMyCatch} from '../../../Catch/ListStack/ListPageContainer/actions';
import { FetchCardList, CardListIsLoading} from '../actions';

export interface Props {
	navigation: any,
	//state
	currentUser: Object,
	userIsValid: boolean,
	cardList: Array<Object>,
	cardListIsLoading: boolean,
	cardListError: Object,
	isMyProfileLoading: boolean,
	//Functions
	logout: Function,
	isMyCatch: Function,
	FetchCardList: Function,
	CardListIsLoading: Function,
	fetchCurrentUser: Funciton,
}
export interface State {}
class MePageContainer extends React.Component<Props, State> {
	myInfo = (divider: string, itemName: string, to: string, func?: Fuinction) => (
		<View>
			<ListItem itemDivider>
				<Text>{divider}</Text>
			</ListItem>
			<ListItem onPress={()=>{
				func;
				this.props.navigation.navigate(to);
			}}>
			 <Body><Text>{itemName}</Text></Body>
			 <Right><Icon name='arrow-forward' /></Right>
			</ListItem>
		</View>
	);
	UNSAFE_componentWillReceiveProps(nextProps){
		nextProps.currentUser != null && nextProps.cardListIsLoading === true
		? nextProps.FetchCardList(nextProps.currentUser.acf.stripe_customer_id): null
	}

	render() {
		return (
			<MePage
				navigation={this.props.navigation}
				currentUser={this.props.currentUser}
				myInfo={this.myInfo}
				logout={this.props.logout}
				isMyCatch={this.props.isMyCatch}
				cardList={this.props.cardList}
				cardListIsLoading={this.props.cardListIsLoading}
				cardListError={this.props.cardListError}
				isMyProfileLoading={this.props.isMyProfileLoading}
				fetchCurrentUser={this.props.fetchCurrentUser}
			/>
		);
	}
}
bindAction = (dispatch) => {
	return {
		logout: lougout => dispatch(logout()),
		isMyCatch: bool => dispatch(isMyCatch(bool)),
		FetchCardList: cards => dispatch(FetchCardList(cards)),
		CardListIsLoading:bool => dispatch(CardListIsLoading(bool)),
		fetchCurrentUser: () => dispatch(fetchCurrentUser()),
	}
}

const mapStateToProps = state => ({
	currentUser: state.loginReducer.currentUser,
	cardList: state.meReducer.cardList,
	cardListIsLoading: state.meReducer.cardListIsLoading,
	cardListError: state.meReducer.cardListError,
	userIsValid: state.loginReducer.userIsValid,
	isMyProfileLoading: state.meReducer.isMyProfileLoading,
});

export default connect(mapStateToProps, bindAction)(MePageContainer);
