import PostItem from "../../../../stories/screens/Catch/NewStack/PostItemPage";
import {Body, Button, Header, Icon, Left, Right, Text, Title} from "native-base";
// @flow
import {connect} from "react-redux";
import * as React from "react";
import {initialCatchInfo} from '../CatchInfoContainer/actions';
import {photoIsUploading, setCatchTitle, setCatchContent, postValidate} from './actions';

export interface Props {
	navigation: any;
	//state
	catchPhotos: Array<string>,
	photoUploading: boolean,
	titleValidation: string,
	contentValidation: string,
	catchTitle: string,
	catchContent: string,
	//Functions
	setCatchTitle: Function,
	setCatchContent: Function,
	photoIsUploading: Function,
	postValidate: Function,
	initialCatchInfo: Function,
}
export interface State {}

class PostItemContainer extends React.Component<Props, State> {
	textValidate = (text: string, field: string) =>{
		text
		?	/[^a-zA-Z0-9 \n\.\,\!]/i.test(text)
			  ? this.props.postValidate(" Only alphanumeric characters", field)
			  : this.props.postValidate(undefined, field)
		: this.props.postValidate(" Required", field)
	}
	render() {
		return (<PostItem
			navigation={this.props.navigation}
			catchPhotos={this.props.catchPhotos}
			setCatchTitle={this.props.setCatchTitle}
			setCatchContent={this.props.setCatchContent}
			photoUploading={this.props.photoUploading}
			textValidate={this.textValidate}
			titleValidation={this.props.titleValidation}
			contentValidation={this.props.contentValidation}
			catchTitle={this.props.catchTitle}
			catchContent={this.props.catchContent}
		/>);
	}
}

function bindAction(dispatch) {
	return{
		setCatchTitle: text => dispatch( setCatchTitle(text)),
		setCatchContent: text => dispatch( setCatchContent(text)),
		photoIsUploading: bool => dispatch( photoIsUploading(bool)),
		postValidate: (text, field) => dispatch( postValidate(text,field)),
	};
}

const mapStateToProps = state => ({
	catchPhotos: state.postItemReducer.catchPhotos,
	catchTitle: state.postItemReducer.catchTitle,
	catchContent: state.postItemReducer.catchContent,
	photoUploading: state.postItemReducer.photoUploading,
	titleValidation: state.postItemReducer.titleValidation,
	contentValidation: state.postItemReducer.contentValidation,
});
export default connect(mapStateToProps,bindAction)(PostItemContainer);
