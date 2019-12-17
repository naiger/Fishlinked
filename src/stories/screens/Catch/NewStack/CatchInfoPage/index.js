// @flow
import styles from "./styles";
import { MapView } from "expo";
import { Body, Button, Container, Content, Form, Input, Item, Label,
      Left, Right, Text, Title,
                         Header,
                         Icon,
                         View } from "native-base";
import * as React from "react";

export interface Props {
	navigation: any;
  //state
  catchMarker: Object,
  region: Object,
  //Functions
  marker: Function,
  field: Function,
  setCatchMarker: Funciton,
  setMapView: Function,
  generateCatch: Function,
  resetMap: Function,
  allValid: Function,
}
export interface State {}
class CatchInfo extends React.Component<Props, State> {
	render() {
    const param = this.props.navigation.state.params;
    console.log("Catch Marker "+JSON.stringify(this.props.catchMarker))
		return (
			<Container style={styles.container}>
        <Header>
  				<Left>
  					<Button transparent onPress={() => this.props.navigation.goBack()}>
  						<Icon name="ios-arrow-back" />
  					</Button>
  				</Left>
  				<Body>
  					<Title>Catch Info</Title>
  				</Body>
  				<Right>
            {
              this.props.allValid()
              ? (
                <Button transparent onPress={() => {
                  this.props.generateCatch();
                  this.props.navigation.navigate("ListStack")
                }}>
      						<Text style={styles.enable}>Post</Text>
      					</Button>
              )
              : <Button transparent><Text style={styles.disabled}>Post</Text></Button>
            }
  				</Right>
  			</Header>
				<Content padder>
					<Form>
            {this.props.field("Fish")}
            {this.props.field("Bait")}
            {this.props.field("Tide")}
            {this.props.field("Equipment")}
            {this.props.field("Weight")}
          </Form>
          <MapView
            style={styles.map}
            region={this.props.region}
            onPress={(e)=> {
              this.props.setCatchMarker(e.nativeEvent.coordinate);
              this.props.setMapView(e.nativeEvent.coordinate);
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            provider="google"
          >
            {
              this.props.catchMarker === null
              ? null
              : (<MapView.Marker draggable
                coordinate={this.props.catchMarker}
                onDragEnd={(e) => this.props.setCatchMarker(e.nativeEvent.coordinate)}/>)
            }
          </MapView>
          <View style={styles.resetContainer}>
            <View style={styles.reset}>
              <Button block info onPress={() => {
                this.props.setCatchMarker(null);
                this.props.setMapView({latitude: -33.8788,longitude: 151.2093});
              }}>
                <Text>RESET MAP</Text>
              </Button>
            </View>
          </View>
				</Content>
			</Container>
		);
	}
}

export default CatchInfo;
