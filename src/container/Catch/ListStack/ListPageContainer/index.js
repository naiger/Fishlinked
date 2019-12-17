// @flow
import ListPage from "../../../../stories/screens/Catch/ListStack/ListPage";
import { fetchList, imagePicker, startSearchCatch, stopSearchCatch,searchCatch,setSearchCatchKeyword,catchSearchSuccess, isMyCatch } from "./actions";
//import datas from "./data";
import { Body, Button, Header, Icon, Left, Right, Title, ActionSheet } from "native-base";
import * as React from "react";
import { connect } from "react-redux";

export interface Props {
	navigation: any,
	//state
	isLoading: bool,
	list: Array<Object>,
	error: Object,
  isSearch:boolean,
	searchResult:Array<Object>,
	searchCatchKeyword:string,
	catchListIsSearching:boolean,
	userIsValid: boolean,
	myCatch: boolean,
	//Functions
	fetchCatches: Function,
	searchCatch:Function,
	setSearchCatchKeyword:Function,
	isMyCatch: Function,
}
export interface State {}

class ListPageContainer extends React.Component<Props, State> {
	componentDidMount() {
		this.props.fetchCatches();
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		nextProps.myCatch
		? this.props.fetchCatches({author: [this.props.currentUser.id]})
		: this.props.fetchCatches()
	}
	searchCatches = (text)=>{
		this.props.setSearchCatchKeyword(text);
		this.props.searchCatch(text);
	}
	render() {
		return(
			 <ListPage
			  navigation={this.props.navigation}
			  list={this.props.list}
				isLoading={this.props.isLoading}
				error ={this.props.error}
				searchResult={this.props.searchResult}
				searchCatchKeyword={this.props.searchCatchKeyword}
				catchListIsSearching={this.props.catchListIsSearching}
				userIsValid={this.props.userIsValid}
				myCatch={this.props.myCatch}
				searchCatches={this.searchCatches}
				isMyCatch={this.props.isMyCatch}
			  />
		 );
	}
}

function bindAction(dispatch) {
	return {
		fetchCatches: options => dispatch( fetchList(options)),
		searchCatch: name => dispatch(searchCatch(name)),
		setSearchCatchKeyword: keyword => dispatch(setSearchCatchKeyword(keyword)),
		isMyCatch: bool => dispatch( isMyCatch(bool)),
	};
}

const mapStateToProps = state => ({
	currentUser: state.loginReducer.currentUser,
	userIsValid: state.loginReducer.userIsValid,
	list: state.catchReducer.list,
	isLoading: state.catchReducer.isLoading,
	error: state.catchReducer.error,
	searchResult:state.catchReducer.searchResult,
	searchCatchKeyword:state.catchReducer.searchCatchKeyword,
	catchListIsSearching:state.catchReducer.catchListIsSearching,
	myCatch: state.catchReducer.myCatch,
});

export default connect (mapStateToProps, bindAction)(ListPageContainer);
