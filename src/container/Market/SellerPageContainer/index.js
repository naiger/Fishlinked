import MyAdsList from "./MyAdsListPageContainer";
import CategoriesSelect from "./CreateAdPageContainer";
import EditAd from "./EditAdPageContainer";
import EditDescription from "./EditDescriptionPageContainer";
import DeletePhotos from './DeletePhotosPageContainer';
import EditPrice from './EditPricePageContainer';
import CreditCard from "./CreditCardPageContainer";
import Payment from "./PaymentPageContainer";
import CardInfo from "./CardInfoPageContainer";
import ImageBrowser from "./ImageBrowserPageContainer";
import Picker from "./PickerPageContainer";
// @flow
import { createStackNavigator } from "react-navigation";

const CreateAd = createStackNavigator(
  {
    CategoriesSelect: { screen: CategoriesSelect},
    EditAd: { screen: EditAd },
    EditDescription : { screen: EditDescription },
    EditPrice: { screen: EditPrice},
    Payment: { screen: Payment},
    CreditCard: { screen: CreditCard},
    CardInfo: { screen: CardInfo},
  },
  {
    initialRouteName: "CategoriesSelect",
    headerMode: "none",
  }
);

const SellerPageNavigator = createStackNavigator(
  {
    MyAdsList: { screen: MyAdsList, },
    CreateAd: { screen: CreateAd, },
    DeletePhotos: { screen: DeletePhotos },
    ImageBrowser: { screen: ImageBrowser },
    Picker: { screen: Picker },
  },
  {
    initialRouteName: "MyAdsList",
    mode: "modal",
    headerMode: "none",
  }
);
export default SellerPageNavigator;
