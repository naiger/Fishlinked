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
		height: deviceWidth * 0.5625 + 30,
	},
	item:{
		backgroundColor: "#eee",
		width: deviceWidth,
		height: deviceWidth *0.5625 + 30,
		flexDirection: 'column',
	},
	title:{
		color: "#000",
		marginTop: 5,
		marginBottom: 5,
		textAlign: "center",
		fontSize: 18,
	},
	image:{
		width: deviceWidth,
		height: deviceWidth * 0.5625,
	}
});
export default styles;
