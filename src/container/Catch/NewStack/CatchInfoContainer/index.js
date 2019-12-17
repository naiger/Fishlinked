import {MapView} from 'expo';
import CatchInfo from "../../../../stories/screens/Catch/NewStack/CatchInfoPage";
import { Body, Button, Header, Icon, Left, Right, Title, Text, Item, Label, Input, View } from "native-base";
// @flow
import * as React from "react";
import {initialPhotos} from '../PostItemContainer/actions';
import styles from './styles';
import {createNewCatch} from '../../ListStack/ListPageContainer/actions';
import { setCatchInfo, resetMap, setMapView, setCatchMarker, catchInfoValidate, initialCatchInfo } from './actions';
import { connect } from "react-redux";

export interface Props {
	navigation: any,
	//State
	fish: string,
	bait: string,
	tide: string,
	equipment: string,
	weight: number,
	catchMarker: Object,
	catchMedia: Array<number>,
	catchTitle: string,
	catchContent: string,
	catchFishValid: string,
	catchBaitValid: string,
	catchTideValid: string,
	catchEquipmentValid: string,
	catchWeightValid: string,
	//Functions
	setCatchInfo: Function,
  setCatchMarker: Funciton,
	setMapView: Function,
	resetMap: Function,
	catchInfoValidate: Function,
	initialPhotos: Function,
	initialCatchInfo: Function,
}
export interface State {}
class CatchInfoContainer extends React.Component<Props, State> {
	generateCatch = () => {
		const newCatch = new Object();
		const fields = new Object();
		if (this.props.catchMarker != null){
			fields.latitude = this.props.catchMarker.latitude;
			fields.longitude = this.props.catchMarker.longitude;
		}
		fields.gallery = this.props.catchMedia;
		fields.fish = this.props.fish;
		fields.bait = this.props.bait;
		fields.tide = this.props.tide;
		fields.equipment = this.props.equipment;
		fields.weight = this.props.weight;
		newCatch.fields = fields;
		newCatch.status = "publish";
		newCatch.title = this.props.catchTitle;
		newCatch.content = this.props.catchContent;
		newCatch.featured_media = this.props.catchMedia[0];
		console.log(newCatch);
		this.props.createNewCatch(newCatch);
		this.props.initialPhotos();
		this.props.initialCatchInfo();
	};
	textValidation = (text: string, field: string) =>{
		/[^a-zA-Z0-9 ]/i.test(text)
		  ? this.props.catchInfoValidate(" Only alphanumeric characters", field)
		  : this.props.catchInfoValidate(undefined, field)
	}
	numberValidation = (number: number, field: string) =>{
		/[^0-9 ]/i.test(number)
		  ? this.props.catchInfoValidate(" Only number", field)
		  : this.props.catchInfoValidate(undefined, field)
	}
	field = (name) =>(
		<View>
			<Item floatingLabel>
				<Label>{name}</Label>
				<Input
					onChangeText={text=> {
						this.props.setCatchInfo(text, name.toUpperCase());
						name === "Weight"
						? this.numberValidation(text, name.toUpperCase())
						: this.textValidation(text, name.toUpperCase())
					}}
					value = {this.props[name.toLowerCase()]}
					/>
			</Item>
			{
				this.props["catch"+[name]+"Valid"] != undefined
				?	(<View style={styles.errorMessage}>
						<Icon name="ios-information-circle" style={styles.errorInfo}/>
						<Text style={styles.error}>{this.props["catch"+[name]+"Valid"]}</Text>
					</View>)
				: null
			}
		</View>
	);
	marker = () => {
		if (this.props.catchMarker != null){
			return (
				<MapView.Marker draggable
					coordinate={this.props.catchMarker}
					onDragEnd={(e) => this.props.setCatchMarker(e.nativeEvent.coordinate)}
				/>
			);
		}
		else return null
	}
	allValid =() => {
		let result = false;
		this.props.catchFishValid === undefined
		&& this.props.catchBaitValid === undefined
		&& this.props.catchTideValid === undefined
		&& this.props.catchEquipmentValid === undefined
		&& this.props.catchWeightValid === undefined
		? result = true
		: result = false
		return result;
	}
	render() {
		return (<CatchInfo
      navigation={this.props.navigation}
			field={this.field}
			marker={this.marker}
			catchMarker={this.props.catchMarker}
			region={this.props.region}
			setCatchMarker={this.props.setCatchMarker}
			setMapView={this.props.setMapView}
			generateCatch={this.generateCatch}
			resetMap={this.props.resetMap}
			allValid={this.allValid}
    />);
	}
}

function bindAction(dispatch) {
	return{
		createNewCatch: newCatch => dispatch( createNewCatch( newCatch)),
		setCatchInfo:(text, field) => dispatch(setCatchInfo(text, field)),
		setCatchMarker: location => dispatch(setCatchMarker(location)),
		setMapView: location => dispatch(setMapView(location)),
		catchInfoValidate: (result, field) => dispatch(catchInfoValidate(result, field)),
		initialPhotos: photo => dispatch(initialPhotos()),
		initialCatchInfo: info => dispatch(initialCatchInfo()),
	};
}
const mapStateToProps = state => ({
	fish: state.catchInfoReducer.fish,
	bait: state.catchInfoReducer.bait,
	tide: state.catchInfoReducer.tide,
	equipment: state.catchInfoReducer.equipment,
	weight: state.catchInfoReducer.weight,
	region: state.catchInfoReducer.region,
	catchMarker: state.catchInfoReducer.catchMarker,
	catchMedia: state.postItemReducer.catchMedia,
	catchTitle: state.postItemReducer.catchTitle,
	catchContent: state.postItemReducer.catchContent,
	catchFishValid: state.catchInfoReducer.catchFishValid,
	catchBaitValid: state.catchInfoReducer.catchBaitValid,
	catchTideValid: state.catchInfoReducer.catchTideValid,
	catchEquipmentValid: state.catchInfoReducer.catchEquipmentValid,
	catchWeightValid: state.catchInfoReducer.catchWeightValid,
});
export default connect(mapStateToProps,bindAction)(CatchInfoContainer);
