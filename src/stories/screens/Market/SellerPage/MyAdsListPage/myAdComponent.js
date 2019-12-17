import styles from "./styles";
import { Button, Icon, Text, ListItem, Card, CardItem} from "native-base";
// @flow
import * as React from "react";
import { Image, View, Alert } from "react-native";

export interface Props {
	navigation: any;
	//state
	currentUser: Object,
	id: number;
	ad: Object;
	del: boolean;
	deleted: booleam;
	//Funcitons
	removeAd: Funciton;
	fetchAdImages: Function;
	initialAdImages: Function,
	initialProductName: Function,
	initialProductDescription: Function,
	fetchLikeList: Function,
}
export interface State {}
class MyAd extends React.Component<Props, State> {
  render(){
    const ad = this.props.ad;
    return (
      <ListItem onPress={()=> {
				this.props.fetchLikeList();
				this.props.navigation.navigate("AdDetail", {ad: ad, prevPage: "MyAdsList"})
			}}>
        <Card>
          <CardItem cardBody>
          <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
            <View style={styles.price}>
              <Icon  name="pricetag"/>
              <Text style={styles.priceText}>${ad.price}</Text>
            </View>
            {
              ad.images.length > 0
              ? <Image style={styles.image} source={{uri:ad.better_featured_image.source_url}}/>
              : (<View style={styles.image}>
                  <Text>No Picture</Text>
                </View>)
            }
            <View style={styles.cardRight}>
              {
								this.props.del
								? (<Button transparent onPress={()=>{
										Alert.alert(
											"Delete",
											"Cannot undo after item deleted",
											[
												{text: "Cancel", style:"cancel"},
												{text: "Delete", onPress: () => {
													console.log("remove from: "+ this.props.currentUser.id);
													this.props.removeAd(this.props.currentUser.id, ad.id);
												}}
											],
											{cancelable: true}
										)}
									}>
										<Icon active name="remove-circle" style={{color:"#DB1F2A"}}/>
									 </Button>)
								: (<Button transparent onPress={() => {
										this.props.initialAdImages(this.props.ad.images.length);
										this.props.initialProductName(this.props.ad.title.rendered);
										this.props.initialProductDescription(this.props.ad.description);
										this.props.navigation.navigate("EditAd",{ad: true, id: this.props.ad.id, images: this.props.ad.images});}}>
									 	<Text>Edit</Text>
									 </Button>)
							}
            </View>
          </View>
          </CardItem>
          <CardItem footer>
            <View style={styles.toDetail}>
              <Text style={styles.itemName}>{ad.title.rendered}</Text>
            </View>
          </CardItem>
        </Card>
      </ListItem>
    );
  }
}

export default MyAd;
