import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
  view:{
    flex: 1,
    flexDirection: "column",
    justifyContent:"center",
    alignItems: "center",
  },
  image:{
		borderWidth: 1,
		borderColor: "#ddd",
		width: deviceWidth * 0.7,
		height: deviceWidth * 0.7,
		alignItems: 'center',
		justifyContent: 'center',
  },
	textArea:{
		height: deviceHeight / 5,
		width: deviceWidth,
		marginTop: deviceHeight / 30,
	},
  inputBox:{
		marginTop: 20,
		backgroundColor: "#fff",
    height: deviceHeight / 5,
    width: deviceWidth * 0.9,
  },
	errorMessage:{
		marginTop: 5,
		marginLeft: deviceWidth /20,
		width: deviceWidth * 0.6,
		height: deviceHeight / 30,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
	errorMessage2:{
		marginTop: 5,
		width: deviceWidth * 0.9,
		height: deviceHeight / 30,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
	errorInfo:{
		color: "red",
		fontSize: 22,
	},
	error:{
		color: "red",
	},
	enable:{
		color:"blue",
	},
	disabled:{
		color:"grey",
	},
});
export default styles;
