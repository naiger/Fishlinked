// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	avatarContainer:{
		height: deviceHeight / 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 15,
	},
	avatar:{
		width: deviceWidth / 3,
		justifyContent: "center",
		alignItems:"flex-start",
	},
	info:{
		width: deviceWidth / 4,
		height: deviceHeight / 12,
		alignItems: "flex-start",
		justifyContent: 'space-between',
	},
	rate:{
		width:deviceWidth / 6,
		height: deviceHeight / 12,
		alignItems: "flex-end",
		justifyContent: 'space-between',
	},
	rateFont:{
		color: "#D3D3D3",
	},
	iconContainer:{
		marginLeft: deviceWidth / 10,
		marginTop: 10,
		width: deviceWidth * 0.8,
		flexDirection: "row",
		alignContent: "center",
		justifyContent:"center",
	},
	icon:{
		width: deviceWidth / 5,
		alignContent: "center",
		justifyContent: "center",
	},
	aboutContainer:{
		marginTop: 10,
		marginLeft: deviceWidth / 10,
		width: deviceWidth * 0.8,
		alignItems:"center",
		justifyContent:"center",
	},
	aboutTitle:{
		width: deviceWidth * 0.8,
		justifyContent: "flex-start",
	},
	about:{
		fontSize: 18,
		fontWeight: "bold",
		fontStyle: "italic",
	},
	description:{
		marginTop: 10,
		width: deviceWidth * 0.8,
		justifyContent: "flex-start",
	},
	imageContainer:{
		marginLeft: deviceWidth / 10,
		width: deviceWidth * 0.8,
		height: deviceWidth * 0.6,
		alignItems:"center",
		justifyContent:"center",
	},
	image:{
		marginTop: 2,
		width: deviceWidth * 0.8,
		height: deviceWidth * 0.45,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	}
});
export default styles;
