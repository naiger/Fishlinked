import CatchInfoContainer from "./CatchInfoContainer";
import PostItemContainer from "./PostItemContainer";
import PhotoBrowserPageContainer from "./PhotoBrowserPageContainer";
// @flow
import { createStackNavigator } from "react-navigation";
import { Animated, Easing } from "react-native";

const NewStack = createStackNavigator(
  {
    CatchInfo: { screen: CatchInfoContainer, },
    PostItem: { screen: PostItemContainer, },
    PhotoBrowser: { screen : PhotoBrowserPageContainer, },
  },
  {
    initialRouteName: "PhotoBrowser",
    headerMode: 'none',
  }
);
export default NewStack;
