// import React from "react";
// import { Camera } from "expo-camera";
// import { View, Text } from "react-native";
// import * as Permissions from "expo-permissions";

// import Style from "./Style";
// import Toolbar from "./Toolbar";
// import Gallery from "./Gallery";

// export default class CameraPage extends React.Component {
//   camera = null;

//   state = {
//     captures: [],
//     capturing: null,
//     hasCameraPermission: null,
//     cameraType: Camera.Constants.Type.back,
//     flashMode: Camera.Constants.FlashMode.off,
//   };

//   setFlashMode = (flashMode) => this.setState({ flashMode });
//   setCameraType = (cameraType) => this.setState({ cameraType });
//   handleCaptureIn = () => this.setState({ capturing: true });

//   handleCaptureOut = () => {
//     if (this.state.capturing) this.camera.stopRecording();
//   };

//   handleShortCapture = async () => {
//     const photoData = await this.camera.takePictureAsync();
//     this.setState({
//       capturing: false,
//       captures: [photoData, ...this.state.captures],
//     });
//   };

//   handleLongCapture = async () => {
//     const videoData = await this.camera.recordAsync();
//     this.setState({
//       capturing: false,
//       captures: [videoData, ...this.state.captures],
//     });
//   };

//   async componentDidMount() {
//     const camera = await Permissions.askAsync(Permissions.CAMERA);
//     const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
//     const hasCameraPermission =
//       camera.status === "granted" && audio.status === "granted";

//     this.setState({ hasCameraPermission });
//   }

//   render() {
//     const {
//       hasCameraPermission,
//       flashMode,
//       cameraType,
//       capturing,
//       captures,
//     } = this.state;

//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>Access to camera has been denied.</Text>;
//     }

//     return (
//       <React.Fragment>
//         <View>
//           <Camera
//             type={cameraType}
//             flashMode={flashMode}
//             style={styles.preview}
//             ref={(camera) => (this.camera = camera)}
//           />
//         </View>

//         {captures.length > 0 && <Gallery captures={captures} />}

//         <Toolbar
//           capturing={capturing}
//           flashMode={flashMode}
//           cameraType={cameraType}
//           setFlashMode={this.setFlashMode}
//           setCameraType={this.setCameraType}
//           onCaptureIn={this.handleCaptureIn}
//           onCaptureOut={this.handleCaptureOut}
//           onLongCapture={this.handleLongCapture}
//           onShortCapture={this.handleShortCapture}
//         />
//       </React.Fragment>
//     );
//   }
// }

import React, { Component, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

// class Media extends Component {
function Media() {
  // render() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      // const { status } = await Camera.requestPermissionsAsync();
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    // <View style={styles.container}>
    //   <Text> Media </Text>
    // </View>
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref) ;
  }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo);
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:"50%",
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:"50%",
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
  // }
}
export default Media;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
