import CategoryListPage from "../../../../stories/screens/Market/BuyerPage/CategoryListPage";
import { fetchCategories } from "./actions";
// @flow
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import * as React from "react";
import {connect} from "react-redux";

export interface Props {
	navigation: any,
	//state
	categoriesIsLoading: boolean,
	categories: Array<Object>,
	categoriesError: Object,
	userIsValid: boolean,
	//Functions,
	fetchCategories: Function,
}
export interface State {}
class CategoryListPageContainer extends React.Component<Props, State> {
	componentDidMount() {
		this.props.fetchCategories({
			parent: 31,
		});
		//console.log(this.props.categories);
	}
	render() {
		return (
			<CategoryListPage
				navigation={this.props.navigation}
				categories={this.props.categories}
				userIsValid={this.props.userIsValid}
				categoriesIsLoading={this.props.categoriesIsLoading}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		fetchCategories: options => dispatch( fetchCategories(options)),
	};
}

const mapStateToProps = state => ({
	categories: state.buyerReducer.categories,
	categoriesIsLoading: state.buyerReducer.categoriesIsLoading,
	categoriesError: state.buyerReducer.categoriesError,
	userIsValid: state.loginReducer.userIsValid,
});

export default connect(mapStateToProps, bindAction)(CategoryListPageContainer);
