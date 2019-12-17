// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	errorMessage:{
		marginTop: 5,
		width: deviceWidth * 0.6,
		height: deviceHeight / 30,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
	errorInfo:{
		color: "red",
		fontSize: 22,
	},
	error:{
		color: "red",
	},
	enable:{
		color:"blue",
	},
	disabled:{
		color:"grey",
	},
});
export default styles;
