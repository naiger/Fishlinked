// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	heart:{
		width: deviceWidth /15,
	},
	like:{
		color:"#DB1F2A",
	},
	item:{
		marginTop: 15,
		height: deviceWidth * 0.75,
		flexDirection: "row",
	},
	image:{
		width: deviceWidth * 0.7,
		height: deviceWidth * 0.7,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	cardRight:{
		width: deviceWidth * 0.1,
		height: deviceWidth * 0.7 ,
		justifyContent:"space-between",
		alignItems: "center",
		flexDirection: "column",
	},
	avatar:{
		marginLeft: 15,
		width: deviceWidth /10,
		alignItems: "center",
	},
	price:{
		 marginLeft: 10,
		 marginTop: deviceWidth * 0.4,
		 width: deviceWidth /10,
		 alignItems: "center",
	},
	priceText:{
		fontSize: 12,
	},
	textArea:{
		marginTop: 20,
		width: deviceWidth,
		height: deviceHeight * 0.25,
		justifyContent:"space-between",
		alignItems: "center",
	},
	textBox:{
		backgroundColor: "#FFF",
		width: deviceWidth * 0.8,
		height: deviceHeight * 0.2,
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 7,
	},
	modalStyle:{
		backgroundColor:'rgba(0,0,0,0.8)',
	},
	closeButton:{
		width:deviceWidth,
		height:deviceHeight* 0.1,
	},
});
export default styles;
