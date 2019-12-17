import PickerPage from "../../../../stories/screens/Market/SellerPage/PickerPage";
import {pickCurrency, pickUnit} from '../EditPricePageContainer/actions';
import {currencyDictionary, unitDictionary} from './data';
// @flow
import { fetchPickerItems, pickerItemsIsSearching } from "./actions";
import {Body, Header, Left, Right, Title} from 'native-base';
import * as React from "react";
import {connect} from "react-redux";

export interface Props {
	navigation: any,
	//State
	pickerItems: Array<Object>,
	itemsIsLoading: boolean,
	currency: string,
	unit: string,
	itemsIsSearching: boolean,
	//Functions
	fetchPickerItems: Function,
	pickCurrency: Function,
	pickUnit: Function,
	pickerItemsIsSearching: Function,
}
export interface State {}
class PickerPageContainer extends React.Component<Props, State> {
	componentDidMount(){
		this.props.fetchPickerItems(this.selectDictionary());
	}
	selectDictionary (){
		let dictionay = [];
		const option = this.props.navigation.state.params.options;
		switch (option){
			case "Currency":{
				dictionay = currencyDictionary;
				break;
			}
			case "Unit":{
				dictionay = unitDictionary;
				break;
			}
		}
		return dictionay;
	}
	searchItems = (text) => {
		let result = [];
		if (text === "") result = this.selectDictionary();
 		else {
			this.selectDictionary().map((item, i)=>{
				let key = Object.keys(item).toString().toLowerCase();
				let value = Object.values(item).toString().toLowerCase();
				let keyword = text.toLowerCase();
				key.includes(keyword) || value.includes(keyword)
				? result.push(item)
				: null
			})
		}
		this.props.fetchPickerItems(result);
	}
	render() {
		return (
			<PickerPage
				navigation={this.props.navigation}
				pickerItems={this.props.pickerItems}
				itemsIsLoading={this.props.itemsIsLoading}
				itemsIsSearching={this.props.itemsIsSearching}
				currency={this.props.currency}
				unit={this.props.unit}
				searchItems={this.searchItems}
				pickCurrency={this.props.pickCurrency}
				pickUnit={this.props.pickUnit}
				pickerItemsIsSearching={this.props.pickerItemsIsSearching}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		fetchPickerItems: items => dispatch( fetchPickerItems(items)),
		pickCurrency: currency => dispatch( pickCurrency(currency)),
		pickUnit: unit => dispatch( pickUnit(unit)),
		pickerItemsIsSearching: bool => dispatch( pickerItemsIsSearching(bool)),
	};
}

const mapStateToProps = state => ({
	pickerItems: state.pickerReducer.pickerItems,
	itemsIsLoading: state.pickerReducer.itemsIsLoading,
	itemsIsSearching: state.pickerReducer.itemsIsSearching,
	currency: state.editPriceReducer.currency,
	unit: state.editPriceReducer.unit,
});

export default connect(mapStateToProps, bindAction)(PickerPageContainer);
