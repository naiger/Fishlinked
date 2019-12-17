import ListPage from "./ListPageContainer";
import CatchPage from "./CatchPageContainer";
// @flow
import { createStackNavigator } from "react-navigation";

const ListStack = createStackNavigator(
  {
    ListPage: { screen: ListPage},
    CatchPage:{ screen: CatchPage},
  },
  {
    initialRouteName: "ListPage",
    headerMode: 'none',
  }
);
export default ListStack;
