import ProfilePage from "../../../stories/screens/Member/ProfilePage";
// @flow
import {Body, Text, Header, Left, Right, Title, Button} from 'native-base';
import * as React from "react";
import { connect } from "react-redux";

const business = require("../../../../assets/images/business.png");
const charters = require("../../../../assets/images/charters.png");
const coperate = require("../../../../assets/images/coperate.png");
const farm = require("../../../../assets/images/farm.png");
const lodges = require("../../../../assets/images/lodges.png");
const restaurant = require("../../../../assets/images/restaurant.png");
const retail = require("../../../../assets/images/retail.png");
const members = require("../../../../assets/images/members.png");
//list of image array
const imageList =[{name:"Business", image:business},
									{name:"Charters",image:charters},
									{name:"Coporate",image:coperate},
									{name:"Farm", image:farm},
									{name:"Lodges",image:lodges},
									{name:"Restaurant",image:restaurant},
									{name:"Retail",image:retail},
									{name:"Members",image:members},];
export interface Props {
	navigation: any,
	//State
	userIsValid: boolean,
}
export interface State {}
class ProfilePageContainer extends React.Component<Props, State> {
	render() {
		return (
			<ProfilePage
				navigation={this.props.navigation}
				imageList={imageList}
				userIsValid={this.props.userIsValid}
			/>
		);
	}
}
const mapStateToProps = state => ({
	userIsValid: state.loginReducer.userIsValid,
});

export default connect(mapStateToProps)(ProfilePageContainer);
