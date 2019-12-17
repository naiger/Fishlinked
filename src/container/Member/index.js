import ProfilePage from "./ProfilePageContainer";
import MemberList from "./MemberListPageContainer"; //importing
import MeStack from "./MeStack";
import MemberDetailPage from "./MemberDetailPageContainer";
// @flow
import { createStackNavigator } from "react-navigation";

const MemberStack = createStackNavigator(
  {
    ProfilePage: { screen: ProfilePage },
    MemberList:{screen:MemberList},
    MeStack:{screen:MeStack},
    MemberDetailPage:{screen: MemberDetailPage},
  },
  {
    initialRouteName: "ProfilePage",
    headerMode: "none",
  }
);
export default MemberStack;
