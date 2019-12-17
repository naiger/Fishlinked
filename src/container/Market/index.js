import BuyerPageNavigator from "./BuyerPageContainer";
import SellerPageNavigator from "./SellerPageContainer";
import { Animated, Easing} from "react-native";
// @flow
import { createStackNavigator } from "react-navigation";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 0.6, 1],
      })
      const scale_x = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [-1, 1, -1]
      })
      const scale_y = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [1, 1, 1]
      })

      return { opacity, transform: [ { scaleX: scale_x } ,{scaleY: scale_y}] }
    },
  }
}

const MarketNavigator = createStackNavigator(
  {
    BuyerPage: { screen: BuyerPageNavigator, },
    SellerPage: { screen: SellerPageNavigator, },
  },
  {
    initialRouteName: "BuyerPage",
    headerMode: "none",
    transitionConfig,
  }
);
export default MarketNavigator;
