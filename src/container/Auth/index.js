import LaunchPage from "./LaunchPageContainer";
import LoginPage from "./LoginPageContainer";
import RegisterPage from "./RegisterPageContainer";
import ForgetPWPage from "./ForgetPWPageContainer";
// @flow
import { createStackNavigator } from "react-navigation";

const AuthNavigator = createStackNavigator(
  {
    LaunchPage: { screen: LaunchPage, },
    LoginPage: { screen: LoginPage, },
    RegisterPage: { screen: RegisterPage, },
    ForgetPWPage: { screen: ForgetPWPage, },
  },
  {
    initialRouteName: "LaunchPage",
    mode: "modal",
    headerMode: "none",
  }
);
export default AuthNavigator;
