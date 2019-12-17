import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	imageContainer:{
		marginTop: -10,
		marginBottom: 10,
		width: deviceWidth * 0.9,
		height: deviceWidth * 0.7,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		borderWidth: 1,
		borderColor: "#ddd",
		width: deviceWidth * 0.7,
		height: deviceWidth * 0.7,
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchContainer:{
		alignItems: 'center',
	},
	seatchbar:{
		marginTop: 5,
		height: deviceHeight / 20,
		width: deviceWidth * 0.9,
		backgroundColor: "#ddd",
	},
});
export default styles;
