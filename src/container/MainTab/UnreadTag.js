//flow
import {Icon,Text} from 'native-base';
import * as React from "react";
import IconBadge from "react-native-icon-badge";
import {connect} from "react-redux";
import {Notifications} from 'expo';

export interface Props {
  userIsValid: boolean,
  numberOfUnread: number,
  focused: boolean,
  iconName: string,
  color: string,
  iconBadgeStyle: any,
}
export interface State {}
class UnreadTag extends React.Component<Props, State> {
	render(){
    return (
      <IconBadge
        MainElement={
          this.props.focused
          ? <Icon name={this.props.iconName} style={{color:this.props.color}} active/>
          : <Icon name={this.props.iconName} style={{color:this.props.color}} />
        }
        BadgeElement={
          <Text style={{ fontSize: 12, color: "white" }}>
            {this.props.numberOfUnread}
          </Text>
        }
        IconBadgeStyle={this.props.iconBadgeStyle}
        Hidden={this.props.userIsValid && this.props.numberOfUnread > 0 ? false : true}
      />
    )
  }
}
const mapStateToProps = state => ({
  numberOfUnread: state.messageReducer.numberOfUnread,
  userIsValid: state.loginReducer.userIsValid,
});
export default connect(mapStateToProps)(UnreadTag)
