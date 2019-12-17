//flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	sendingAlert:{
		marginBottom: 5,
		height: deviceHeight / 25,
		width: deviceWidth,
		backgroundColor: "#ddd",
		alignItems: 'center',
		justifyContent: 'center',
	},
	spinnerContainer:{
		width: deviceWidth,
		height: deviceHeight,
		alignItems: 'center',
		justifyContent: 'center'
	},
	sending: {
		color: "#FFF",
	},
});
export default styles;
