// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	like:{
		color:"#DB1F2A",
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
		marginTop: 2,
		width: deviceWidth * 0.6,
		height: deviceWidth * 0.6,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	price:{
		 marginLeft: 10,
		 marginTop: deviceWidth * 0.4,
		 width: deviceWidth /10,
		 alignItems: "center"
	},
	priceText:{
		fontSize: 12,
	},
	cardRight:{
		width: deviceWidth * 0.2,
		height: deviceWidth * 0.7 ,
		justifyContent: "flex-start",
		flexDirection: "column",
	},
	itemName:{
		textAlign: "center",
	},
	toDetail:{
		width: deviceWidth * 0.8,
		alignItems:"center",
		justifyContent: "center",
	},
	searchContainer:{
		width: deviceWidth,
		alignContent: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	searchbar:{
		marginLeft: deviceWidth/ 40,
		marginTop: 5,
		height: deviceHeight / 27,
		width: deviceWidth * 0.85,
		backgroundColor: "#ddd",
	},
});
export default styles;
