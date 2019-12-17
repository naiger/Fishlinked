import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles: any = StyleSheet.create({
	shadow: {
		flex: 1,
		position: "absolute",
		width: deviceWidth,
		height: deviceHeight,
	},
	content:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	title:{
		marginTop: deviceHeight / 7,
		color: "#333",
		fontSize: 48,
		fontWeight: "bold",
		textAlign: "center",
	},
	title2:{
		marginTop: deviceHeight / 7,
		color: "#333",
		fontSize: 40,
		fontWeight: "bold",
		textAlign: "center",
	},
	subtitle:{
		marginTop: deviceHeight / 30,
		color: "#ddd",
		fontSize: 36,
		textAlign: "center",
	},
	formBox:{
		marginTop: deviceHeight / 15,
		width: deviceWidth * 0.8,
		height: deviceHeight / 6,
		justifyContent: "space-around",
		alignItems: "center",
	},
	formBox:{
		marginTop: deviceHeight / 15,
		width: deviceWidth * 0.8,
		height: deviceHeight / 5,
		justifyContent: "space-around",
		alignItems: "center",
	},
	leftTop:{
		height: deviceHeight / 30,
		alignItems: 'flex-start',
		width: deviceWidth,
	},
	buttonBox:{
		marginTop: deviceHeight / 8,
		marginBottom: deviceHeight / 4,
		width: deviceWidth * 0.8,
		height: deviceHeight / 4,
		justifyContent: "space-around",
		alignItems: "center",
	},
	buttonBox2:{
		marginTop: deviceHeight / 15,
		marginBottom: deviceHeight / 4,
		width: deviceWidth * 0.8,
		height: deviceHeight / 6,
		justifyContent: "space-around",
		alignItems: "center",
	},
	iconLight:{
		color:"#eee",
	}
});
export default styles;
