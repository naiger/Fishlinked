import MyCurrencyPage from "../../../../stories/screens/Member/Me/MyCurrencyPage";
// @flow
import {Body, Header, Left, Right, Title,Button,Icon} from 'native-base';
import * as React from "react";
import {fetchMyCurrency, currencyIsSearching, updateMyProfile} from '../actions';
import {currencyDictionary} from '../data';
import {connect} from "react-redux";

export interface Props {
	navigation: any,
	//State
	currentUser: Object,
	currencyList: string,
	myCurrencyIsLoading: boolean,
	myCurrencyIsSearching: boolean,
	//Functions
	fetchMyCurrency: Function,
	currencyIsSearching: Function,
	updateMyCurrency: Function,
}
export interface State {}
class MyCurrencyPageContainer extends React.Component<Props, State> {
	componentDidMount(){
		this.props.fetchMyCurrency(currencyDictionary);
	}
	searchCurrency = (text) => {
		let result = [];
		if (text === "") result = currencyDictionary;
 		else {
			currencyDictionary.map((item, i)=>{
				let key = Object.keys(item).toString().toLowerCase();
				let value = Object.values(item).toString().toLowerCase();
				let keyword = text.toLowerCase();
				key.indexOf(keyword) > -1 || value.indexOf(keyword) > -1
				? result.push(item)
				: null
			})
		}
		this.props.fetchMyCurrency(result);
	}
	render() {
		return (
			<MyCurrencyPage
				navigation={this.props.navigation}
				currencyList={this.props.currencyList}
				myCurrencyIsLoading={this.props.myCurrencyIsLoading}
				myCurrencyIsSearching={this.props.myCurrencyIsSearching}
				searchCurrency={this.searchCurrency}
				currencyIsSearching={this.props.currencyIsSearching}
				myCurrency={this.props.currentUser.acf.currency}
				updateMyProfile={this.props.updateMyProfile}
			/>
		);
	}
}
function bindAction(dispatch) {
	return {
		fetchMyCurrency: currency => dispatch( fetchMyCurrency(currency)),
		currencyIsSearching: bool => dispatch( currencyIsSearching(bool)),
		updateMyProfile: currency => dispatch( updateMyProfile(currency)),
	};
}

const mapStateToProps = state => ({
	myCurrencyIsLoading: state.meReducer.myCurrencyIsLoading,
	myCurrencyIsSearching: state.meReducer.myCurrencyIsSearching,
	currencyList: state.meReducer.currencyList,
	currentUser: state.loginReducer.currentUser,
});

export default connect(mapStateToProps, bindAction)(MyCurrencyPageContainer);
