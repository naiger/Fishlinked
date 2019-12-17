// @flow
import { StyleSheet,Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	imageContainer:{
		width:deviceWidth,
		height: deviceWidth,
		alignItems: 'center',
		justifyContent:'center',
	},
	image:{
		width:deviceWidth*0.9,
		height:deviceWidth*0.9,
	},
	textStyle:{
		margin:5,
		padding:5,
	},
	dateContainer:{
		width:deviceWidth,
		height: deviceHeight / 20,
		alignItems: 'center',
		justifyContent:'center',
	},
	noPicContainter:{
		width:deviceWidth,
		height: deviceHeight / 10,
		alignItems: 'center',
		justifyContent:'center',
	},
	modalStyle:{
		backgroundColor:'rgba(0,0,0,0.8)',
	},
	modalImage:{
		width:deviceWidth,
		height:deviceHeight* 0.8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text:{
		color:'white',
		fontSize:15,
		alignSelf:'flex-end',
	},
	closeButton:{
		width:deviceWidth,
		height:deviceHeight* 0.1,
	}
});
export default styles;
