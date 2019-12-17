import CategoryList from "./CategoryListPageContainer";
import AdList from "./AdListPageContainer";
import AdDetail from "./AdDetailPageContainer";
// @flow
import { createStackNavigator } from "react-navigation";

const BuyerPageNavigator = createStackNavigator(
  {
    CategoryList: { screen: CategoryList, },
    AdList: { screen: AdList, },
    AdDetail: { screen: AdDetail, },
  },
  {
    initialRouteName: "CategoryList",
    headerMode: "none",
  }
);
export default BuyerPageNavigator;
