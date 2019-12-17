import styles from "./styles";
import * as React from "react";
import { Body, Button, Container, Content, SearchBar,Header, Icon, Left, Right, Title, Thumbnail,List, ListItem,Text,Item,Input, Spinner,} from "native-base";
import { View, RefreshControl} from "react-native";
// @flow
export interface Props {
	navigation: any,
	//State
	memberList: Array<Object>,
	memberListError: Object,
	memberListIsLoading: boolean,
	list: Array<Object>,
	isSearch: boolean,
	searchResult: Array<Object>,
	searchMembeKeyword: string,
	memberListIsSearching: boolean,
	//Functions
  startSearchMember: Funciton,
	stopSearchMember: Function,
	searchMember: Function,
	setSearchMemberKeyword: Function,
	enterChannel: Function,
}
export interface State {}
class MemberListPage extends React.Component<Props, State> {
	numOfCatch (id) {
		const catches = this.props.list.filter(c => c.author == id).length;
		return catches;
	}
	render() {
		let memberList = [];
		this.props.searchMembeKeyword === ""
		? memberList = this.props.memberList
		: memberList = this.props.searchResult
		return (
			<Container style={styles.container}>
				<Header hasSegment>
					<Left>
						<Button transparent onPress={()=>{this.props.navigation.goBack()}}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Member List</Title>
					</Body>
					<Right>
						<Button transparent onPress={() => this.props.startSearchMember()}>
							<Icon name="search"/>
						</Button>
					</Right>
				</Header>
				{
					this.props.isSearch
					? (
							<View style={styles.searchContainer}>
								<Item inlineLable rounded style={styles.searchbar}>
									<Icon name="ios-search" />
									<Input placeholder="Search" onChangeText={(text) => {
										console.log(text);
										if (text.length>0){
											this.props.setSearchMemberKeyword(text);
											this.props.searchMember(text);
											this.forceUpdate();
										}
									}}/>
									<Icon name="ios-people" />
								</Item>
								<Button transparent>
									<Icon name="close" onPress={() => this.props.stopSearchMember()}/>
								</Button>
							</View>
						)
					: null
				}
				<Content
					refreshControl={
						<RefreshControl
							refreshing={this.props.memberListIsLoading}
							onRefresh={()=>this.props.setSearchMemberKeyword("")}
							enabled={true}
							titile="Loading..."/>
				}>
					<List>
					{
						memberList.length > 0
						? memberList.map((member, i) => (
							<ListItem avatar key={i} onPress={()=>{
								this.props.navigation.navigate("MemberDetailPage",{member: member, ads: this.numOfCatch(member.id)});
							}}>
	 							<Left>
	 								<Thumbnail source={{ uri: member.avatar_urls["48"]}} />
	 							</Left>
	 							<Body>
	 								<Text style={styles.username}>{member.name}</Text>
	 								<Text note>{this.numOfCatch(member.id)+ " catches"}</Text>
	 							</Body>
	 							<Right style={styles.chatContainer}>
									<Button transparent style={styles.button} onPress={() => {
										this.props.enterChannel(member);
									}}>
										<Text style={styles.chat}>Chat</Text>
									</Button>
	 							</Right>
								</ListItem>
						))
						: this.props.memberListIsLoading
						  ? null
							: <Text>No result</Text>
					}
					</List>
				</Content>
			</Container>
		);
	}
}

export default MemberListPage;
