// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	remove:{
		width: deviceWidth / 5,
		alignContent: 'flex-end',
		justifyContent: 'flex-end',
	},
});
export default styles;
