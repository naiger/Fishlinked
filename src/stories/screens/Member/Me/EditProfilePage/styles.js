// @flow
import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	avatar:{
		height: deviceHeight / 8,
		width: deviceWidth,
		justifyContent: "center",
		alignItems: 'center',
	},
	text:{
		marginTop: 20,
		width: deviceWidth * 0.9,
		alignItems: "center",
	},
	login:{
		width: deviceWidth * 0.8,
		height: deviceHeight / 8,
		justifyContent: 'space-between',
		alignItems: "center",
	},
});
export default styles;
