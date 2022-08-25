



// import react native gesture handler
import 'react-native-gesture-handler';


import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, ImageBackground,
 } from 'react-native';

import BackgroundImage from "../assets/BackgroundImage.png";
import { Directions } from 'react-native-gesture-handler';


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
>
</TouchableOpacity>

<TouchableOpacity
accessible={true}
accessibilityLabel="Choose color"
accessibilityHint="Let’s you choose  color yellow as background"
accessibilityRole="button"
 style={styles.color3}
  onPress={() => 
    this.setBgColor(this.colors.yellow)
  }
>
</TouchableOpacity>

<TouchableOpacity
accessible={true}
accessibilityLabel="Choose color"
accessibilityHint="Let’s you choose  color blue as background"
accessibilityRole="button"
style={styles.color4}
  onPress={() => 
    this.setBgColor(this.colors.blue)
  }
>
</TouchableOpacity>
</View>

<Pressable style={styles.button}
        
          onPress={() => this.props.navigation.navigate('Chat', { 
            name: this.state.name,
            bgColor: this.state.bgColor
           })}
        >
  <Text style={styles.pressText}>Start Chatting</Text>
</Pressable>
</View>


</ImageBackground>
      </View>
    )
  }
  
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

 chooseBox: {
  flex:0.4,
    marginRight: "auto",
    paddingLeft: 15,
    width: "88%",

 
  },

  chooseTtitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginBottom: 10,
  },

  box: {
 
    height: "44%",
    width: "88%",
    marginBottom: 30,
    backgroundColor: "#ffffff",
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    height: 260,
    minHeight: 260,
    maxHeight: 300,
  },
  button: {
    width: "88%",
    height: 70,
    borderRadius: 8,
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
  },
  pressText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  title : {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  titleFrame : {
    width: "60%",
    height: "auto",
    alignItems: "center",
    marginTop: 50,
    resizeMode: "contain",
    flex: 1,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000",
    height: 50,
    width: '88%',
    borderRadius: 5,
    marginBottom: 40,
    padding:10,
  },
  TextInput: {
    marginTop:5,
    fontSize: 16,
    fontWeight: '300',
    opacity: .5,
    color: "#888",

  },
 

  colorFrame: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
color1: {
  backgroundColor: "green",
  padding: 10,
  width: 50,
  height: 50,
  borderRadius:25
},
color2: {
  backgroundColor: "red",
  padding: 10,
  width: 50,
  height: 50,
  borderRadius:25
},
color3: {
  backgroundColor: "yellow",
  padding: 10,
  width: 50,
  height: 50,
  borderRadius:25
},
color4: {
  backgroundColor: "blue",
  padding: 10,
  width: 50,
  height: 50,
  borderRadius:25
},


 
});
