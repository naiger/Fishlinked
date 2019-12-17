// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	button:{
		width: deviceWidth,
		height: deviceHeight / 20,
		justifyContent: 'center',
		alignContent: 'center'
	},
	page:{
		flex: 1,
		alignItems: 'center',
		justifyContent:'space-between',
		flexDirection: 'column',
	},
	item:{
		backgroundColor: "#eee",
		width: deviceWidth,
		height: deviceWidth *0.5625 + 30,
		flexDirection: 'column',
	},
	title:{
		height: deviceHeight / 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image:{
		borderWidth: 1,
		borderColor: "#ddd",
		width: deviceWidth * 0.7,
		height: deviceWidth * 0.7,
		alignItems: 'center',
		justifyContent: 'center',
	},
	enable:{
		color: "blue",
	},
	disabled:{
		color: "grey",
	},
});
export default styles;
