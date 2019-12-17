// @flow
import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},
	info:{
		fontSize: 24,
		color: "#000",
		fontWeight: 'bold',
	},
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});
export default styles;
