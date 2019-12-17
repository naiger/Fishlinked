import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	map:{
		marginTop: 20,
		width: deviceWidth * 0.9,
		height: deviceWidth * 0.9,
	},
	reset:{
		marginTop: 20,
		height: deviceHeight /10,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	enable:{
		color:"blue",
	},
	disabled:{
		color:"grey",
	},
});
export default styles;
