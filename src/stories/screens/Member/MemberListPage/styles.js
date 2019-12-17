// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	username: {
		fontWeight:"bold",
		fontSize: 20,
	},
	chatContainer:{
		alignItems: "center",
		justifyContent: "center",
	},
	chat:{
		color:"blue",
	},
	button:{
		height: 30,
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
