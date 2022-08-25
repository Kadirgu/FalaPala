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
  
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }
  
  
  // delete function for testing
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  
  

// Add messages to Firebase 
addMessages(message) {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
  
    });
  }
  
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages), }), () => { 
          this.addMessages(this.state.messages[0]);
          this.saveMessages()
          this.deleteMessages()
      })
   
    }
    renderBubble(props) {
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
  
  
    renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
        return(
          <InputToolbar
          {...props}
          />
        );
      }
    }
  
    renderCustomView(props) {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
          <MapView
            style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        );
      }
      return null;
    }
  
  
    renderCustomActions = (props) => {
      return <CustomActions {...props} />;
    };
    render() {
  
       let  {bgColor} = this.props.route.params;
      return (
      
        <View style={{flex:1, justifyContent: 'center', backgroundColor: bgColor}}>
          <GiftedChat
              renderInputToolbar={this.renderInputToolbar.bind(this)}
              renderActions={this.renderCustomActions}
           renderBubble={this.renderBubble.bind(this)}
           renderCustomView={this.renderCustomView}
    messages={this.state.messages}
    onSend={messages => this.onSend(messages)}
    user={{ _id: this.state.user._id, name: this.state.user.name }}
  />
  { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
   }
  </View>
       
      )
    }
  }