// @flow
import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon,
  Input, Item, Left, Right, Text, Title, Textarea, View, Spinner,
                                                         Label, Form} from "native-base";
import * as React from "react";
import Carousel from "react-native-carousel-view";
import { Dimensions, Image } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export interface Props {
  navigation: any;
	//state
	catchPhotos: Array<string>,
  photoUploading: boolean,
  titleValidation: string,
  contentValidation: string,
  catchTitle: string,
  catchContent: string,
	//Functions
  setCatchTitle: Function,
	setCatchContent: Function,
  textValidate: Function,
  initialCatchInfo: Function,
}
export interface State {}
class PostItem extends React.Component<Props,State>{

  render(){
    const param = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Header>
  				<Left>
  					<Button transparent onPress={() => this.props.navigation.navigate("PhotoBrowser")}>
  						<Icon name="ios-arrow-back"/>
  					</Button>
  				</Left>
  				<Body>
  					<Title>Catch Info</Title>
  				</Body>
  				<Right>
          {
            this.props.catchTitle != ""
            && this.props.catchContent != ""
            && this.props.titleValidation === undefined
            && this.props.contentValidation === undefined
            && !this.props.photoUploading
            ? (<Button transparent onPress={() => this.props.navigation.navigate("CatchInfo")}>
      					<Text style={styles.enable}>Next</Text>
      				</Button>)
            : (
              <Button transparent onPress={() =>{
                this.props.textValidate(this.props.catchTitle, "TITLE");
                this.props.textValidate(this.props.catchContent, "CONTENT");
              }}>
                <Text style={styles.disabled}>Next</Text>
              </Button>
            )
          }
  				</Right>
  			</Header>
        <Content padder>
        <View style={styles.view}>
        {
          this.props.photoUploading
          ? (
              <View style={styles.image}>
                <Spinner color="grey"/>
                <Text>Uploading</Text>
              </View>
            )
          : (
              <Carousel
                width={deviceWidth*0.7}
                height={deviceWidth*0.7}
                animate={false}
                indicatorSize={20}
                indicatorOffset={10}
                indicatorText="•"
                inactiveIndicatorText="•"
              >
              {
                this.props.catchPhotos.length > 0
                ? this.props.catchPhotos.map((photo,i) => (
                  <View style={styles.image} key={i}>
                    <Image style={styles.image} source={{uri:photo}}/>
                  </View>
                  ))
                : <View style={styles.image}><Text>No Picture</Text></View>
              }
              </Carousel>
            )
          }
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                onChangeText={(text) => {
                  this.props.setCatchTitle(text);
                  this.props.textValidate(text, "TITLE");
                }}
                onFocus= {()=> this.props.textValidate(this.props.catchTitle, "TITLE")}/>
            </Item>
            {
              this.props.titleValidation != undefined
              ? (<View style={styles.errorMessage}>
      						<Icon name="ios-information-circle" style={styles.errorInfo}/>
      						<Text style={styles.error}>{this.props.titleValidation}</Text>
      					</View>)
              : null
            }
            <Item regular style={styles.inputBox}>
              <Textarea
              rowSpan={5}
              placeholder="Write about your catch today and share ..."
              onChangeText={(text) => {
                this.props.setCatchContent(text);
                this.props.textValidate(text, "CONTENT");
              }}
              onFocus= {()=> this.props.textValidate(this.props.catchContent, "CONTENT")}
              />
            </Item>
            {
              this.props.contentValidation != undefined
              ? (<View style={styles.errorMessage2}>
                  <Icon name="ios-information-circle" style={styles.errorInfo}/>
                  <Text style={styles.error}>{this.props.contentValidation}</Text>
                </View>)
              : null
            }
          </Form>
       </Content>
      </Container>
    );
  }
}

export default PostItem;
