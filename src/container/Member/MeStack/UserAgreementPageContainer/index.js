import UserAgreementPage from "../../../../stories/screens/Member/Me/UserAgreementPage";
import * as React from "react";
import {Body, Header, Left, Right, Text,Title,Button,Icon} from "native-base";
export interface props{
  navigation:any,
}

export interface state{}

class UserAgreementPageContainer extends React.Component<state,props>{
  render() {
    return <UserAgreementPage navigation={this.props.navigation} />;
  }
}

export default UserAgreementPageContainer;
