import styles from "./styles";
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title, Spinner, View, List, ListItem } from "native-base";
// @flow
import * as React from "react";
import { ScrollViewm, Modal } from "react-native";

export interface Props {
	navigation: any;
	//State
	currentUser: Object,
	isMessageListFetching: boolean,
	isChatUserFetching: boolean,
	isMessageSending: boolean,
	messageList: Array<Object>,
	chatUser: Object,
	//Functions
	chatUI: Function,
	cleanMessageList: Function,
	fetchMessageList: Function,
	updateLastComsumedMessageIndex: Function,
}
export interface State {}
class MessagePage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={()=>	{
							this.props.messageList.length > 0
							? this.props.updateLastComsumedMessageIndex(
									param.sid,
									this.props.currentUser.id,
									(this.props.messageList[this.props.messageList.length-1]._id))
							: null
							this.props.cleanMessageList();
							this.props.navigation.goBack();
						}}>
							<Icon name='arrow-back' />
						</Button>
					</Left>
					<Body><Title>{param.friendlyName}</Title></Body>
					<Right/>
				</Header>
				{
					this.props.isMessageSending
					? (<View style={styles.sendingAlert}>
							<Text>Message Sending...</Text>
						</View>)
					: null
				}
				{
					this.props.isMessageListFetching || this.props.isChatUserFetching
					? <Spinner color = "grey"/>
					: this.props.chatUI()
				}
			</Container>
		);
	}
}

export default MessagePage;
