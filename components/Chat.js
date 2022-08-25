import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat'

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import CustomActions from './CustomActions';

import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import firebase from "firebase";
import "firebase/firestore";

import NetInfo from '@react-native-community/netinfo';

import AsyncStorage from "@react-native-async-storage/async-storage";



export default class Chat extends React.Component {
    constructor(props) {
      super();
      this.state = {
        messages: [],
        uid: 0,
     
        user: {
          _id: '',
          name: '',
        },
  isConnected: null,
  image: null,
  location: null
  
      };
  

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyDNHECUKbWKGL0shCgBK-HN7ry6At3o504",
    authDomain: "falapala-chatapp.firebaseapp.com",
    projectId: "falapala-chatapp",
    storageBucket: "falapala-chatapp.appspot.com",
    messagingSenderId: "45406076426",
    appId: "1:45406076426:web:b8808cc072f194755ae9f3",
  };
  
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  // Reference to the Firestore collection "messages"
  this.referenceChatMessages = firebase.firestore().collection("messages");
  
  }

  componentDidMount() {
    // Set name as title chat
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  
    // Check if user is offline or online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
  
        // Reference to load messages from Firebase
        this.referenceChatMessages = firebase
          .firestore()
          .collection('messages');
  
        // Authenticate user anonymously
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
              },
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
          });
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
    });
  }
  
  componentWillUnmount() {
    if (this.isConnected) {
      this.unsubscribe();
      this.authUnsubscribe();
    }
  }
  
  
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };
  
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