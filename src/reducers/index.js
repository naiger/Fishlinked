import catchReducer from "../container/Catch/ListStack/ListPageContainer/reducer";
import catchDetailReducer from "../container/Catch/ListStack/CatchPageContainer/reducer";
//NewStack
import postItemReducer from "../container/Catch/NewStack/PostItemContainer/reducer";
import catchInfoReducer from "../container/Catch/NewStack/CatchInfoContainer/reducer";
import photoBrowserReducer from "../container/Catch/NewStack/PhotoBrowserPageContainer/reducer"

import buyerReducer from "../container/Market/BuyerPageContainer/CategoryListPageContainer/reducer";
import adDetailReducer from "../container/Market/BuyerPageContainer/AdDetailPageContainer/reducer";
//Auth
import loginReducer from "../container/Auth/LoginPageContainer/reducer";
import registerReducer from "../container/Auth/RegisterPageContainer/reducer";
import forgetReducer from "../container/Auth/ForgetPWPageContainer/reducer";
//Map
import mapReducer from "../container/Map/MapPageContainer/reducer";
//Member
import memberListReducer from "../container/Member/MemberListPageContainer/reducer";
import memberReducer from"../container/Member/MemberDetailPageContainer/reducer";
//Me
import meReducer from "../container/Member/MeStack/reducer";
//Message
import messageReducer from "../container/Message/reducer";

import pickerReducer from "../container/Market/SellerPageContainer/PickerPageContainer/reducer";

import adListReducer from "../container/Market/BuyerPageContainer/AdListPageContainer/reducer";
import myAdListReducer from "../container/Market/SellerPageContainer/MyAdsListPageContainer/reducer";
import newAdReducer from "../container/Market/SellerPageContainer/CreateAdPageContainer/reducer";
import editAdReducer from "../container/Market/SellerPageContainer/EditAdPageContainer/reducer";
import deletePhotosReducer from "../container/Market/SellerPageContainer/DeletePhotosPageContainer/reducer";
import editPriceReducer from "../container/Market/SellerPageContainer/EditPricePageContainer/reducer";
import editDescReducer from "../container/Market/SellerPageContainer/EditDescriptionPageContainer/reducer";
import paymentReducer from "../container/Market/SellerPageContainer/PaymentPageContainer/reducer";
import creditReducer from "../container/Market/SellerPageContainer/CreditCardPageContainer/reducer";
import cardInfoReducer from "../container/Market/SellerPageContainer/CardInfoPageContainer/reducer";
import imageBrowserReducer from "../container/Market/SellerPageContainer/ImageBrowserPageContainer/reducer";
// @flow
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
	form: formReducer,
	//Catch
	//ListStack
	catchReducer,
	catchDetailReducer,
	//NewStack
	postItemReducer,
	catchInfoReducer,
	photoBrowserReducer,
	//Map
	mapReducer,
	//Buyer
	buyerReducer,
	adDetailReducer,
	//Auth
	loginReducer,
	registerReducer,
	forgetReducer,
	//Member
	memberReducer,
	memberListReducer,
	//Me
	meReducer,
	//Message
	messageReducer,
	//Market
	pickerReducer,
	newAdReducer,
	myAdListReducer,
	editAdReducer,
	adListReducer,
	editDescReducer,
	editPriceReducer,
	paymentReducer,
	creditReducer,
	cardInfoReducer,
	imageBrowserReducer,
	deletePhotosReducer,
});
