import CreditCardDetailPage from "../../../../stories/screens/Member/Me/CreditCardDetailPage";
import * as React from "react";
import {Body, Header, Left, Right, Text,Title,Button,Icon} from "native-base";
import {connect} from "react-redux";
import {updateMyProfile, setMyNewCard, createNewCard, updateStripeCustomer} from '../actions';
//flow
export interface props{
  navigation:any,
  //States
  myNewCard: Object,
  currentUser: Object,
  customer: Object,
  //Functions
  updateMyProfile: Function,
  setMyNewCard: Function,
}
export interface state{}
class CreditCardDetailContainer extends React.Component<state,props>{
  getNewCardInfo = (card: Object) => {
    const data = card.values;
		const expiry = data.expiry.split('/');
    const myCard = new Object;
    var params = {
	 		'card[number]': data.number.replace(/\s/g,""),
      'card[exp_month]': expiry[0],
      'card[exp_year]': expiry[1],
      'card[cvc]': data.cvc,
		};
    this.props.setMyNewCard(params);
  }
  saveNewCard = async() => {
    let token = await this.props.createNewCard(this.props.myNewCard);
    this.createNewCustomer(token);
  }
  createNewCustomer = async(token) => {
    let customer = await this.props.updateStripeCustomer(token, this.props.myProfile.acf.stripe_customer_id);
    this.updateCardList(customer);
  }
  updateCardList = (id) => {
    const data = new Object;
    const fields = new Object;
    fields.stripe_customer_id = id;
    data.fields = fields;
    console.log(data);
    this.props.updateMyProfile(data);
    this.props.navigation.navigate("MePage");
  }
  UNSAFE_componentWillReceiveProps(nextProps){
  }
  render() {
    return(
      <CreditCardDetailPage
        navigation={this.props.navigation}
        getNewCardInfo={this.getNewCardInfo}
        saveNewCard={this.saveNewCard}
      />
    );
  }
}

function bindAction(dispatch) {
	return {
		updateMyProfile: currency => dispatch( updateMyProfile(currency)),
    setMyNewCard: card => dispatch( setMyNewCard(card)),
    createNewCard: card => dispatch(createNewCard(card)),
    updateStripeCustomer: (token, id) => dispatch(updateStripeCustomer(token, id)),
	};
}

const mapStateToProps = state => ({
  myNewCard: state.meReducer.myNewCard,
  currentUser: state.loginReducer.currentUser,
  customer: state.meReducer.customer,
});

export default connect(mapStateToProps,bindAction)(CreditCardDetailContainer);
