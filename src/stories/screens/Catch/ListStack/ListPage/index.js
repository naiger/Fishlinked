// @flow
import styles from "./styles";
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Item, Input, Spinner, ListItem, CardItem, Card, Thumbnail, List, Text, Segment} from "native-base";
import * as React from "react";
import {Image,View, Alert, RefreshControl} from "react-native";

export interface Props {
  navigation: any;
  //State
  isLoading: bool,
  list: Array<Object>,
  error: Object,
  searchResult:Array<Object>,
  searchCatchKeyword:string,
  catchListIsSearching:boolean,
  userIsValid: boolean,
  myCatch: boolean,
  //Functions
  searchCatches: Function,
  isMyCatch: Function,
}

export interface State {}
class ListPage extends React.Component<Props, State> {
  render() {
    let list = [];
		this.props.searchCatchKeyword === ""
		? list = this.props.list
		: list= this.props.searchResult
    return (
      <Container style={styles.container}>
        <Header hasSegment>
          <Left>
          {
            this.props.myCatch
            ? (<Button transparent onPress={() => {
                this.props.isMyCatch(false);
                this.props.navigation.navigate("MePage");
              }}>
                <Icon active name="arrow-back"/>
              </Button>)
            : null
          }
          </Left>
          <Body><Title>{this.props.myCatch ? "My Catch" : "Catch"}</Title></Body>
          <Right>
            <Button transparent onPress={() => {
              this.props.userIsValid
              ? this.props.navigation.navigate("PhotoBrowser")
              : Alert.alert(
								 "Alert",
								 "You must login first to access this page.",
								 [
									 {text: "Login", onPress: () => this.props.navigation.navigate("LoginPage",{from: "ListPage", to:"PhotoBrowser"})},
									 {text: "Sign up", onPress: () => this.props.navigation.navigate("RegisterPage")},
									 {text: "Cancel", style:"cancel"},
								 ]
               )
            }}>
              <Icon active name="camera"/>
            </Button>
          </Right>
        </Header>
        <View style={styles.searchContainer}>
          <Item inlineLable rounded style={styles.seatchbar}>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={text => this.props.searchCatches(text)}/>
           </Item>
        </View>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading || this.props.catchListIsSearching}
              onRefresh={()=>this.props.searchCatches("")}
              enabled={true}
              titile="Loading..."/>
        }>
          <List>
          {
            list && list.length > 0
            ? list.map((item, i) => (
              <ListItem
                key={i}
                onPress={() =>{this.props.navigation.navigate("CatchPage", {catch: item});}}
              >
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri:'Image URL'}} />
                    <Body>
                      <Text>{item.title.rendered}</Text>
                      <Text>{item.date.slice(0,10)}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <View style={styles.imageContainer}>
                  {
                    item.better_featured_image != null
                    ? <Image style={styles.image} source={{uri: item.better_featured_image.source_url}}/>
                    : <View style={styles.image}><Text>No Picture</Text></View>
                  }
                  </View>
                </CardItem>
              </Card>
              </ListItem>
            ))
            : this.props.isLoading
              ? null
              : <Text>No Result</Text>
          }
          </List>
        </Content>
      </Container>
    );
  }
}

export default ListPage;
