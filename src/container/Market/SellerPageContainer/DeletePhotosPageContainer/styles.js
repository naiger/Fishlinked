// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	icon:{
		marginLeft: -deviceWidth * 0.3,
		width: deviceWidth * 0.32,
		height: deviceWidth * 0.32,
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
		marginLeft: deviceWidth * 0.01,
		width: deviceWidth * 0.32,
		height: deviceWidth * 0.32,
	}
});
export default styles;
