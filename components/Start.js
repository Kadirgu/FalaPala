import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import BackgroundImage from '../img/Background_Image.png';

// Create constant that holds background colors for Chat Screen
const colors = {
  black: "#090C08",
  purple: "#474056",
  grey: "#8A95A5",
  green: "#B9C6AE",
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage source={BackgroundImage} resizeMode='cover' style={styles.image}>
        <Text style={styles.title}>App title</Text>
        <View style={styles.box}>
        <TextInput
          onChangeText={(name) => setName(name)}
          value={name}
          style={styles.input}
          placeholder="Type your Name!"
          />
          <Button
            style={{ heigt: 16, wieght: 600, color: '#fffff', buttoncolor: '#757083'  }}
            title="Go to Chat"
            onPress={() =>
              this.props.navigation.navigate("Chat", { name: this.state.name})
          }
          />
              <Text style={styles.text}>Choose Background Color:</Text>
              <View style={styles.colorContainer}>

              <Button>style={[{ backgroundColor: colors.black }, styles.colorbutton]}
              onPress={() => setColor(colors.black)}
              </Button> 

              <Button>style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
              onPress={() => setColor(colors.purple)}
              </Button> 

              <Button>style={[{ backgroundColor: colors.grey }, styles.colorbutton]}
              onPress={() => setColor(colors.grey)}
              </Button> 

              <Button>style={[{ backgroundColor: colors.green }, styles.colorbutton]}
              onPress={() => setColor(colors.green)}
              </Button> 
              

              </View>

          </View>
          </BackgroundImage>
      </View>
    );
  }
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
  