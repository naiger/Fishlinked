import ListStack from "./ListStack";
import NewStack from "./NewStack";
// @flow
import { createStackNavigator } from "react-navigation";

const CatchNavigator = createStackNavigator(
  {
    ListStack: { screen: ListStack, },
    NewStack: { screen: NewStack, },
  },
  {
    initialRouteName: "ListStack",
    mode: 'modal',
    headerMode: 'none',
  }
);
export default CatchNavigator;
