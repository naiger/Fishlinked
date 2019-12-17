import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Title, Item, Input, Separator, View, Spinner, ListItem, Text, List} from "native-base";
// @flow
import * as React from "react";
export interface Props {
	navigation: any,
	//State
	myCurrency: string,
	currencyList: string,
	myCurrencyIsLoading: boolean,
	myCurrencyIsSearching: boolean,
	//Functions
	searchCurrency: Function,
	currencyIsSearching: Function,
	updateMyProfile: Function,
}
export interface State {}
class MyCurrencyPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		const data = new Object;
		const fields = new Object;
		data.fields = fields;
		return (
			<Container>
				<Header hasSegment>
					<Left>
						<Button transparent onPress={()=>this.props.navigation.navigate("MePage")}>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body><Title>My Currency</Title></Body>
					<Right>
						<Button transparent onPress={()=>this.props.currencyIsSearching(true)}>
							<Icon name="search"/>
						</Button>
					</Right>
				</Header>
				{
					this.props.myCurrencyIsSearching
					? (
						<View style={styles.searchContainer}>
							<Item inlineLable rounded style={styles.searchbar}>
								<Icon name="ios-search" />
								<Input placeholder="Search" onChangeText={(text) => {
									this.props.searchCurrency(text);
								}}/>
							</Item>
							<Button transparent onPress={() => {
								this.props.searchCurrency("");
								this.props.currencyIsSearching(false);
							}}>
								<Icon name="close"/>
							</Button>
						</View>
					)
					: null
				}
			  <Content>
				{
					this.props.myCurrencyIsLoading
					? <Spinner color="grey"/>
					: (<List>
						{
							this.props.currencyList.map((item, i) => (
								<ListItem key={i} onPress={() => {
									fields.currency = Object.keys(item).toString();
									this.props.updateMyProfile(data);
									this.props.navigation.navigate("MePage");
								}}>
									<Left>
										<Text style={Object.keys(item).toString() === this.props.myCurrency ? styles.picked : null}>
											{Object.values(item)}
										</Text>
									</Left>
									<Right>
										<Text style={Object.keys(item).toString() === this.props.myCurrency ? styles.picked : null}>
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
export default MyCurrencyPage;
