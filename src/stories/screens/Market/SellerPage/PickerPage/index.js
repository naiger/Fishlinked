import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title, Spinner, List, ListItem, Item, Input, View } from "native-base";
// @flow
import * as React from "react";

export interface Props {
	navigation: any;
	//State
	pickerItems: Object,
	itemsIsLoading: boolean,
	currency: string,
	unit: string,
	itemsIsSearching: boolean,
	//Functions
	pickCurrency: Function,
	pickUnit: Function,
	pickerItemsIsSearching: Function,
	searchItems: Function,
}
export interface State {}
class PickerPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		console.log(this.props.itemsIsSearching);
		return (
			<Container style={styles.container}>
				<Header hasSegment>
					<Left>
						<Button transparent onPress = {()=> this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>{param.options}</Title>
					</Body>
					<Right>
						<Button transparent onPress={()=>this.props.pickerItemsIsSearching(true)}>
							<Icon name="search"/>
						</Button>
					</Right>
				</Header>
				{
					this.props.itemsIsSearching
					? (
						<View style={styles.searchContainer}>
							<Item inlineLable rounded style={styles.searchbar}>
								<Icon name="ios-search" />
								<Input placeholder="Search" onChangeText={(text) => this.props.searchItems(text)}/>
							</Item>
							<Button transparent onPress={() => this.props.pickerItemsIsSearching(false)}>
								<Icon name="close"/>
							</Button>
						</View>
					)
					: null
				}
				<Content>
				{
					this.props.itemsIsLoading
					? <Spinner color="grey"/>
					: (<List>
						{
							this.props.pickerItems.map((item, i) => (
								<ListItem key={i} onPress={() => {
									param.options === "Currency"
									? this.props.pickCurrency(Object.keys(item).toString())
									: param.options === "Unit"
										? this.props.pickUnit(Object.keys(item).toString())
										: null
									this.props.navigation.navigate("EditPrice")
								}}>
									<Left>
										<Text style={
											(Object.keys(item).toString() === this.props.currency
											|| Object.keys(item).toString() === this.props.unit)
											? styles.picked
											: null}
										>
											{Object.values(item)}
										</Text>
									</Left>
									<Right>
										<Text style={
											(Object.keys(item).toString() === this.props.currency
											|| Object.keys(item).toString() === this.props.unit)
											? styles.picked
											: null}
										>
											{Object.keys(item)}
										</Text>
									</Right>
								</ListItem>
							))
						}
					</List>)
				}
				</Content>
			</Container>
		);
	}
}

export default PickerPage;
