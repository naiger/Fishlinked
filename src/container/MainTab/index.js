import CatchNavigator from "../../container/Catch";
import MapNavigator from "../../container/Map";
import MarketNavigator from "../../container/Market";
import MemberNavigator from "../../container/Member";
import MessageNavigator from "../../container/Message";
import { Badge, Button, Footer, FooterTab, Icon, Text, View,} from "native-base";
// @flow
import * as React from "react";
import IconBadge from "react-native-icon-badge";
import UnreadTag from './UnreadTag';
import { connect } from "react-redux";
import { createBottomTabNavigator, TabBarBottom } from "react-navigation-tabs";

//use createBottomTabNavigator, temperoarily conflicy with iPhoneX safeArea
const MainNavigator = createBottomTabNavigator(
	{
		Catch: {
			screen: CatchNavigator,
		},
		Map: {
			screen: MapNavigator,
		},
		Market: {
			screen: MarketNavigator,
		},
		Messages: {
			screen: MessageNavigator,
		},
		Members: {
			screen: MemberNavigator,
		},
	},
  {
		initialRouteName: "Catch",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const badgeStyle = {
          position:"absolute",
          top:1,
          right:-10,
          minWidth:15,
          height:15,
          borderRadius:15,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FF0000"
        };
        let iconName;
        if (routeName === "Catch") {
          iconName = "star";
        } else if (routeName === "Map") {
          iconName = "navigate";
        } else if (routeName === "Market") {
          iconName = "briefcase";
        } else if (routeName === "Messages") {
          iconName = "chatbubbles";
        } else if (routeName === "Members") {
          iconName = "people";
        }
        if (routeName != "Messages"){
          if (focused) return <Icon name={iconName} style={{color:tintColor}} active/>;
          else return <Icon name={iconName} style={{color:tintColor}}/>;
        }
        else return (
          <UnreadTag
            focused={focused}
            iconName={iconName}
            color={tintColor}
            iconBadgeStyle={badgeStyle}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      activeBackgroundColor: "lightgray",
    },
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
  }
);

export default (MainNavigator);
