// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	searchBar: {
		marginTop: 10,
		backgroundColor: "#fff",
		height: deviceHeight / 20,
	},
	map:{
		width: deviceWidth * 0.9,
		height: deviceWidth * 0.9,
		marginTop: 20,
	},
	pinInfo:{
		textAlign: "center",
		color: "#333",
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20,
	},
	markerImage:{
		width: deviceWidth / 3.5,
		height: deviceWidth / 3.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export default styles;
