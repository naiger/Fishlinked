// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	subtitle:{
		backgroundColor: "#eee",
		height: 40,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	remove:{
		width: deviceWidth / 5,
		alignContent: 'flex-end',
		justifyContent: 'flex-end',
	},
	item:{
		backgroundColor: "#eee",
		width: deviceWidth,
		height: deviceHeight / 3,
		flexDirection: "column",
	},
	itemDivider:{
		marginTop: 2,
		marginBottom: 2,
		textAlign: "center",
		fontSize: 18,
	},
	image:{
		marginTop: 10,
		marginLeft: 10,
		width: deviceWidth * 0.6,
		height: deviceWidth * 0.6,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	price:{
		marginLeft: 10,
		marginTop: 10,
		width: deviceWidth /10,
		height: deviceWidth * 0.6,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	priceText:{
		fontSize: 12,
	},
	cardRight:{
		width: deviceWidth * 0.2,
		height: deviceWidth * 0.6,
		justifyContent: "flex-start",
		flexDirection: "column",
	},
	itemName:{
		textAlign: "center",
	},
	toDetail:{
		marginBottom: 10,
		width: deviceWidth * 0.8,
		justifyContent: 'flex-start',
		alignItems:"center",
	},
});
export default styles;
