// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	icon:{
		marginLeft: -deviceWidth * 0.21,
		width: deviceWidth / 4,
		height: deviceWidth / 4,
		alignItems:'flex-end',
		justifyContent: 'flex-end',
	},
	imagesContainer:{
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	item:{
		backgroundColor: "#eee",
		width: deviceWidth,
		height: deviceWidth *0.5625 + 30,
		flexDirection: "column",
	},
	tick:{
		color: "#7FFF00",
	},
	image:{
		width: deviceWidth / 4,
		height: deviceWidth / 4,
	},
});
export default styles;
