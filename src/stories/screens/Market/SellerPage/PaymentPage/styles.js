// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	cardContainer:{
		width: deviceWidth,
		height: deviceHeight / 3.5,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		height: deviceHeight / 4,
		width: deviceWidth * 0.95,
		borderWidth: 1,
		borderColor: "#ddd",
		justifyContent: "space-around",
		alignItems: "center",
	},
	cardHeader: {
		flex: 1,
		width: deviceWidth * 0.95,
		marginTop: 10,
		marginLeft: 15,
		alignItems: "flex-start",
	},
	cardBody :{
		flex: 4,
		width: deviceWidth * 0.9,
		backgroundColor: "#0077BE",
		justifyContent: "center",
		alignItems: "center"
	},
	price:{
		color: "#FFF",
		fontWeight: "bold"
	},

});
export default styles;
