// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	page:{
		flex: 1,
		alignItems: "center",
		justifyContent:"space-between",
		flexDirection: "column",
	},
	title:{
		height: deviceHeight / 10,
		alignItems: "center",
		justifyContent: "center",
	},
	name:{
		borderWidth: 1,
		width: deviceWidth * 0.6,
		height: deviceHeight / 20,
	},
	errorMessage:{
		marginTop: 5,
		width: deviceWidth * 0.6,
		height: deviceHeight / 30,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
	errorMessage2:{
		marginTop: 5,
		width: deviceWidth * 0.6,
		height: deviceHeight / 30,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
	separate:{
		height: deviceHeight / 30,
	},
	comments:{
		width: deviceWidth * 0.9,
		height: deviceHeight / 5,
	},
	picker:{
		color: "blue",
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
