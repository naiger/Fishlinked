import MapPage from "./MapPageContainer";
//// @flow
import { createStackNavigator } from "react-navigation";

const MapNavigator = createStackNavigator(
  {
    MapPage: { screen: MapPage, },
  },
  {
    initialRouteName: "MapPage",
  }
);
export default MapNavigator;
