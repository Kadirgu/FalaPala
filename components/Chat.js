import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import MapView from 'react-native-maps';

import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";

import { auth, db } from '../config/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';




export default function Chat(props) {
    // Retrieving the name and color properties passed from the Start Screen
    let { name, color } = props.route.params;

    // State to hold messages
    const [messages, setMessages] = useState([]);

    // State to hold information if user is offline or online
    const [isConnected, setIsConnected] = useState();

    // Create reference to the messages collection on firestore
    const messagesRef = db.collection("messages");

    // OFFLINE: Create functions to display messages when user is offline
    // 1. Save messages to async storage
    const saveMessages = async () => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messages));
        }
        catch (error) {
            console.log(error.message);
        }
    }

    // 2. Retrieve messages from async storage
    const getMessages = async () => {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            setMessages(JSON.parse(messages));
        }
        catch (error) {
            console.log(error.message);
        }
    }

    // 3. Delete messages from async storage (for development purposes only)
    const deleteMessages = async () => {
        try {
            await AsyncStorage.removeItem('messages');
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        // Set the screen title to the user name entered in the start screen
        props.navigation.setOptions({ title: name });

        // Create variable to hold unsubsriber
        let unsubscribe;

        // Check if user is offline or online using NetInfo
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        });

        // If user is online, retrieve messages from firebase store, if offline use AsyncStorage
        if (isConnected) {
            

            // Delete previously saved messages in asyncStorage
            deleteMessages();
            // Save messages to asyncStorage
            saveMessages();

            // unsubsribe snapshot listener on unmount
            return () => unsubscribe();
        }
        else {
            // Load messages from asyncStorage
            getMessages();
        }
    }, [isConnected]);


    // Add the last message of the messages state to the Firestore messages collection
    const addMessage = (message) => {
        addDoc(messagesRef, {
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: message.user,
            image: message.image || null,
            location: message.location || null,
        });
    }

    // Create custom onSend function, appending the newly created message to the messages state, 
    // then calling addMessage to add to Firestore
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        addMessage(messages[0]);
    }, [])

    // Reading snapshot data of messages collection, adding messages to messages state
    const onCollectionUpdate = (querySnapshot) => {
        setMessages(
            querySnapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text || '',
                user: doc.data().user,
                image: doc.data().image || null,
                location: doc.data().location || null,
            }))
        )
    }

    // Customize the color of the sender bubble
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }

    // Hide input bar if user is online so that they cannot create or send messages
    const renderInputToolbar = (props) => {
        if (!isConnected) {
            // Hide Toolbar
        }
        else {
            // Display Toolbar
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    // Render the CustomActions component next to input bar to let user send images and geolocation
    const renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    // Render Custom View to display map when user shares geolocation
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={styles.map}
                    region={{
                        latitude: currentMessage.location.coords.latitude,
                        longitude: currentMessage.location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }


    return (
        // Setting the background color to the color picked by the user in the start screen
        <View
            style={[{ backgroundColor: color }, styles.container]}
        >
            <GiftedChat
                renderBubble={renderBubble.bind()}
                renderInputToolbar={renderInputToolbar.bind()}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                // Add user data to message, using name provided in start screen and uid from auth object
                user={{
                    _id: auth?.currentUser?.uid,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any'
                }}
            />

            {/* Avoid keyboard to overlap text messages on older Andriod versions */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3
    }
})