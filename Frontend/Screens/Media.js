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

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
import firebase from "../Database/firebase";
import { userData } from '../localData/data';

let roundDictVals = (dict) => {
  for (let k in dict){
    dict[k] = Math.round(dict[k] * 100) / 100;
  }
  return dict;   
}
let uploadImageFetch = async (source) => {

  const data = new FormData();
  let localUri = source.uri
  let filename = localUri.split('/').pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  data.append('receipt', {
    uri: localUri,
    type: type, // or photo.type
    name: 'receipt'
  });
  console.log('Calling fetch with body: ' + JSON.stringify(data));
  return await fetch(`http://192.168.0.103:5000/` + 'upload', {
    method: 'POST',
    headers: {
      "accepts": "application/json",
      "Access-Control-Allow-Origin": '*',
      // 'Content-Type': 'multipart/form-data',
    },
    body: data,
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log('Upload: Fetch successful')
      console.log(responseJson);
      let id = responseJson.receipt_id
      return id
    }).catch((error) => {
      console.log('Upload:' + JSON.stringify(error, Object.getOwnPropertyNames(error)));
    });
  }

let getReceiptCategories = async (id) => {

  return await fetch(`http://192.168.0.103:5000/` + 'single_categorize', {
    method: 'POST',
    headers: {
      "accepts": "application/json",
      "Access-Control-Allow-Origin": '*',
      // 'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify({
      receipt_id: id
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log('Categories: Fetch successful')
      console.log(responseJson);
      return roundDictVals(responseJson);
    }).catch((error) => {
      console.log('Categories: ' + JSON.stringify(error, Object.getOwnPropertyNames(error)));
    });
}

let getReceiptChart = async (id, type) => {

  return await fetch(`http://192.168.0.103:5000/` + 'single_' + type, {
    method: 'POST',
    headers: {
      "accepts": "application/json",
      "Access-Control-Allow-Origin": '*',
      // 'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify({
      receipt_id: id
    }),
  }).then((response) => response.blob())
    .then(async (responseBlob) => {
      console.log('Chart: Fetch successful')
      return await uploadBlobToFirebase(responseBlob, id, type);
    }).catch((error) => {
      console.log('Chart: ' + JSON.stringify(error, Object.getOwnPropertyNames(error)));
    });
}

let getOverallCategories = async () => {
  return await fetch(`http://192.168.0.103:5000/` + 'categorize', {
    method: 'POST',
    headers: {
      "accepts": "application/json",
      "Access-Control-Allow-Origin": '*',
      // 'Content-Type': 'multipart/form-data',
    },
    body: null
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log('Categories: Fetch successful')
      console.log(responseJson);
      return roundDictVals(responseJson);
    }).catch((error) => {
      console.log('Categories: ' + JSON.stringify(error, Object.getOwnPropertyNames(error)));
    });
}

let getOverallChart = async (type) => {

  return await fetch(`http://192.168.0.103:5000/` + type, {
    method: 'POST',
    headers: {
      "accepts": "application/json",
      "Access-Control-Allow-Origin": '*',
      // 'Content-Type': 'multipart/form-data',
    },
    body: null,
  }).then((response) => response.blob())
    .then(async (responseBlob) => {
      console.log('Chart: Fetch successful')
      return await uploadOverallBlobToFirebase(responseBlob, type);
    }).catch((error) => {
      console.log('Chart: ' + JSON.stringify(error, Object.getOwnPropertyNames(error)));
    });
}

let uploadImageToFirebase = async (uri, id, type) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  await firebase.storage().ref().child(`${type}_${id}`).put(blob);
  let url = await firebase.storage().ref().child(`${type}_${id}`).getDownloadURL();
  console.log(url);
  return url;
}
let uploadBlobToFirebase = async (blob, id, type) => {
  console.log('Blob type: ' + typeof (blob))
  await firebase.storage().ref().child(`${type}_${id}`).put(blob);
  let url = await firebase.storage().ref().child(`${type}_${id}`).getDownloadURL();
  console.log(url);
  return url;
}

let uploadOverallBlobToFirebase = async (blob, type) => {
  console.log('Blob type: ' + typeof (blob))
  await firebase.storage().ref().child(`${type}`).put(blob);
  let url = await firebase.storage().ref().child(`${type}`).getDownloadURL();
  console.log(url);
  return url;
}
let _storeData = async () => {
  fetch(`http://192.168.0.103:5000/save`, {
    method: 'POST',
    headers: {
      "accepts": "application/json",
      "Access-Control-Allow-Origin": '*',
      // 'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify(userData)
  }).then(console.log('Save successful'))
  .catch(error => console.log('Error in saving'));
};

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
        setCameraRef(ref);
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
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {
            if (cameraRef) {
              let photo = await cameraRef.takePictureAsync();
              const manipResult = await ImageManipulator.manipulateAsync(
                photo.localUri || photo.uri,
                [{ rotate: 0 }],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
              );
              let receiptId = await uploadImageFetch(manipResult);
              let receiptUrl = await uploadImageToFirebase(manipResult.uri, receiptId, 'receipt');
              let categoriesToPrice = await getReceiptCategories(receiptId);
              let pieUrl = await getReceiptChart(receiptId, 'pie');
              let barUrl = await getReceiptChart(receiptId, 'bar');
              let overallCategories = await getOverallCategories();
              let overallPieUrl = await getOverallChart('pie');
              let overallBarUrl = await getOverallChart('bar');

              let receiptData = {
                image: receiptUrl,
                categoriesToPrice: categoriesToPrice,
                pie: pieUrl,
                bar: barUrl
              }

              userData.receipts[receiptId] = receiptData;
              userData.categoriesToPrice = overallCategories;
              userData.pieUrl = overallPieUrl;
              userData.barUrl = overallBarUrl;
              console.log(userData);
              _storeData();

              // console.log('photo', photo);
              // uploadImageFetch(photo, 'categorize');
            }
          }}>
            <View style={{
              borderWidth: 2,
              borderRadius: "50%",
              borderColor: 'white',
              height: 50,
              width: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <View style={{
                borderWidth: 2,
                borderRadius: "50%",
                borderColor: 'white',
                height: 40,
                width: 40,
                backgroundColor: 'white'
              }} >
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
