import React from 'react';
import { View, Platform, KeyboardAvoidingView, Text, Button } from "react-native";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'This is a system message',
                    createdAt: new Date(),
                    system: true,
                },
            ]
        })
    }

    // this is what will be called when a user sends a message
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    // adds background colors for the chat text to the different chat users
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#D3D3D3'
                    },
                    right: {
                        backgroundColor: '#006400',
                    },
                }}
            />
        );
    }

    render() {

        // takes the input parameters of background color defined in the start.js component

        let name = this.props.route.params.name;
        let color = this.props.route.params.color;
        // let { name, color } = this.props.route.params;
        this.props.navigation.setOptions({ title: name }, { backgroundColor: color });


        return (
            <View style={{ flex: 1, backgroundColor: color }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />

                {/* this fixes android keyboard */}
                {Platform.OS === "android" ? (<KeyboardAvoidingView behavior="height" />) : null}
            </View>

        );
    }
} 