// @flow
import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	notLogin:{
		height: deviceHeight / 2,
		width: deviceWidth,
		justifyContent: "space-between",
		alignContent: "center",
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
		justifyContent: 'flex-start',
		alignItems: "center",
	},
	cardRow:{
		marginLeft: deviceWidth * 0.06,
		flexDirection: 'row',
		width: deviceWidth * 0.8,
		justifyContent: 'space-between',
		alignItems: "center",
	},
	left:{
		width: deviceWidth * 0.3,
	},
	body:{
		width: deviceWidth * 0.5,
	}
});
export default styles;
