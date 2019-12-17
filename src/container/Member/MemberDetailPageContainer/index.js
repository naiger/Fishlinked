import MemberDetailPage from "../../../stories/screens/Member/MemberDetailPage";
// @flow
import {Body, Header, Left, Right, Title, Button, Icon,Text,} from "native-base";
import * as React from "react";
import { connect } from "react-redux";
import {fetchMember} from "./actions";

export interface Props {
	navigation: any,
	//State
	member: Object,
	memberError: Object,
	memberIsLoading: boolean,
	//Functions
	fetchMember: Function,
}
export interface State {}
class MemberDetailPageContainer extends React.Component<Props, State> {
	render() {
		return (
			<MemberDetailPage
				navigation={this.props.navigation}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		fetchMember: id => dispatch( fetchMember(id)),
	};
}

const mapStateToProps = state => ({
	member: state.memberReducer.member,
	memberIsLoading: state.memberReducer.memberIsLoading,
	memberError: state.memberReducer.memberError,
});

export default connect(mapStateToProps, bindAction)(MemberDetailPageContainer);
