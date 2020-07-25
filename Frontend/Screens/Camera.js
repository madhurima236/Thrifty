import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
//import { Camera } from "expo-camera";

// export default function Camera extends Component() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={{ flex: 1 }}>
//       <Camera style={{ flex: 1 }} type={type}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "transparent",
//             flexDirection: "row",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               flex: 0.1,
//               alignSelf: "flex-end",
//               alignItems: "center",
//             }}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}
//           >
//             <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
//               {" "}
//               Flip{" "}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

class Camera extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" style={{ color: tintColor }} />
    ),
  };
  render() {
    return (
      <View style={styles.container}>
        <Text> Camera </Text>
      </View>
    );
  }
}
export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
