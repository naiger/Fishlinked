// @flow
import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	listStyle:{
		paddingHorizontal:10,
		paddingVertical: 15,
		fontSize:15,
		marginBottom:10,
	},
	picked:{
		color: "blue",
		fontWeight: 'bold',
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
