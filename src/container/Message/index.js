import MessagePage from './MessagePageContainer';
import ChannelPage from "./ChannelPageContainer";
// @flow
import { createStackNavigator } from "react-navigation";

const ListStack = createStackNavigator(
  {
    ChannelPage: { screen: ChannelPage, },
    MessagePage: {screen: MessagePage},
  },
  {
    initialRouteName: "ChannelPage",
    headerMode: "none",
  }
);
export default ListStack;
