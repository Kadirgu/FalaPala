// import react native gesture handler
import 'react-native-gesture-handler';


import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, ImageBackground,
 } from 'react-native';

import BackgroundImage from "../assets/BackgroundImage.png";
import { Directions } from 'react-native-gesture-handler';

// Create constant that holds background colors for Chat Screen
const colors = {
    pink: "#FFC0CB",
    purple: "#474056",
    violet: "#EE82EE",
    green: "#B9C6AE",
};

export default class Start extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        name: '', 
        bgColor: this.colors.blue,
  
      };
    }
  
   
  
    colors = {
      red: "#890000",
      yellow: "#FFFF00",
      blue: "#1B70A0",
      green: "#1DA01B",
    };
  
    setBgColor = (color) =>    this.setState({ bgColor: color });
   
   
    render() {
      return (
        <View style={  styles.container}>
          <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
          <View style={styles.titleFrame}>
            <Text style={styles.title}>FalaPala</Text>
                </View>
  
                <View style={styles.box}>
                <View style={styles.inputBox}>
         <TextInput
           style={styles.TextInput}
           onChangeText={(name) => this.setState({name})}
           value={this.state.name}
           placeholder='Your name'
         />
        </View>
        <View style={styles.chooseBox}>
       <Text style={styles.chooseTtitle}>Choose Background Color</Text>
       </View>
       <View style={styles.colorFrame}>
     
       <TouchableOpacity
       accessible={true}
       accessibilityLabel="Choose color"
       accessibilityHint="Let’s you choose  color green as background"
       accessibilityRole="button"
        style={styles.color1}
  onPress={() => 
    this.setBgColor(this.colors.green)
  }
>
</TouchableOpacity>

<TouchableOpacity
accessible={true}
accessibilityLabel="Choose color"
accessibilityHint="Let’s you choose  color red as background"
accessibilityRole="button"
 style={styles.color2}
  onPress={() => 
    this.setBgColor(this.colors.red)
  }
></TouchableOpacity>
    return (
        <View style={styles.container}>
            <ImageBackground
                source={BackgroundImage}
                resizeMode='cover'
                style={styles.image}
            >

                <Text style={styles.title}>Chat App</Text>

                <View style={styles.box}>

                    {/* Input box to set user name passed to chat screen */}
                    <TextInput
                        onChangeText={(name) => setName(name)}
                        value={name}
                        style={styles.input}
                        placeholder='Type your name + pronounce'
                    />

                    {/* Allow user to choose a background color for the chat screen */}
                    <Text style={styles.text}>Choose Background Color:</Text>
                    <View style={styles.colorContainer}>
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.pink }, styles.colorbutton]}
                            onPress={() => setColor(colors.pink)}
                        />
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
                            onPress={() => setColor(colors.purple)}
                        />
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.violet }, styles.colorbutton]}
                            onPress={() => setColor(colors.grey)}
                        />
                        <TouchableOpacity
                            style={[{ backgroundColor: colors.green }, styles.colorbutton]}
                            onPress={() => setColor(colors.green)}
                        />
                    </View>

                    {/* Authenticate user & Open chatroom, passing user name and background color as props */}
                    <Pressable
                        onPress={onHandleStart}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? '#585563'
                                    : '#757083'
                            },
                            styles.button
                        ]}
                    >
                        <Text style={styles.buttontext}>Start Chatting</Text>
                    </Pressable>
                </View>
            </ImageBackground>
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
    },

    box: {
        width: '88%',
        backgroundColor: 'white',
        alignItems: 'center',
        height: '44%',
        justifyContent: 'space-evenly',

    },

    input: {
        height: 50,
        width: '88%',
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,

    },

    text: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
    },

    colorContainer: {
        width: '88%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    colorbutton: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    button: {
        height: 50,
        width: '88%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttontext: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    }
});