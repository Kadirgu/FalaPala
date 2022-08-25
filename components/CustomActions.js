import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';


//import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';


import * as Location from 'expo-location';
import firebase from 'firebase';
import 'firebase/firestore';

class CustomAction extends React.Component {

  // Upload images to firebase and convert it to a blob 
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  // User picks an image from the library to send on the chat
  async pickImage() {
    // permission to select image from library?
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
      if (status === 'granted') {
        // pick image, if permission granted
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch((error) => console.error(error));

        // if not cancelled, upload and send image
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);

          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // User takes a picture to send in the chat
  async takePhoto() {
    // permission to use camera?
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    try {
      // launch camera, if permission granted
      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch(error => console.error(error));
        // if action is not cancelled, upload and send image
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);

          this.props.onSend({ image: imageUrl });
         
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // User gets own location to send in the chat 
  getLocation = async () => {
    // Ask for permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status === 'granted') {
        let result = await Location.getCurrentPositionAsync({});

        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      Alert(error.message || 'An error has occurred!');
    }
  };

  // Actionsheet with different options 
  onActionPress = () => {
 
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length-1;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.pickImage();
          case 1:
            return this.takePhoto();
          case 2:
            return this.getLocation();
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Send an image or your location"
        accessibilityRole="button"
        style={[styles.container]}
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    widht: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    width: 26,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomAction.contextTypes = {
  actionSheet: PropTypes.func,
};

const CustomActions = connectActionSheet(CustomAction);

export default CustomActions;