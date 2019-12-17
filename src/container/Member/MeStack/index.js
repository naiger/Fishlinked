import MePage from "./MePageContainer";
import MyCurrencyPage from "./MyCurrencyPageContainer";
import CreditCardDetailPage from "./CreditCardDetailContainer";
import EditProfilePage from './EditProfilePageContainer';
import UserAgreementPage from './UserAgreementPageContainer';
// @flow
import { createStackNavigator } from "react-navigation";

const MeStack = createStackNavigator(
  {
    MePage:{screen:MePage},
    MyCurrencyPage:{screen:MyCurrencyPage},
    CreditCardDetailPage:{screen: CreditCardDetailPage},
    EditProfilePage:{screen: EditProfilePage},
    UserAgreementPage:{screen: UserAgreementPage},
  },
  {
    initialRouteName: "MePage",
    headerMode: "none",
  }
);

export default MeStack;
