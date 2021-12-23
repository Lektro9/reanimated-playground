import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";
import AllTheLotties from "./components/AllTheLotties";
import AllTheLottiesThorma from "./components/AllTheLottiesThorma";
import Background from "./components/Background";
import Crank from "./components/Crank";
import PictureSlider from "./components/PictureSlider";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const ROTATION_THROTTLE = 400;
export const CRANK_WIDTH = 150;
export const CRANK_HEIGHT = 150;
const FRAME_HEIGHT = HEIGHT < 668 ? HEIGHT / 2 : HEIGHT / 2.5;
export const DIR_PATH = "thorma";

export type pictureType = {
  picPath: ImageSourcePropType;
};

const myPics: pictureType[] = [
  { picPath: require("./assets/" + DIR_PATH + "/1.jpg") },
  { picPath: require("./assets/" + DIR_PATH + "/2.jpg") },
  { picPath: require("./assets/" + DIR_PATH + "/3.jpg") },
  { picPath: require("./assets/" + DIR_PATH + "/4.jpg") },
  { picPath: require("./assets/" + DIR_PATH + "/5.jpg") },
  { picPath: require("./assets/" + DIR_PATH + "/6.jpg") },
];

const rotationLimit = (myPics.length - 1) * 360;
export default function App() {
  const [loaded] = useFonts({
    Handwritten: require("./assets/SignPainterHouseScriptRegular.ttf"),
  });

  const rotation = useSharedValue(0);
  const animationProgress = useSharedValue(0);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        let roundedTransX = Math.round(event.velocityX);
        let roundedTransY = Math.round(event.velocityY);
        if (event.y >= CRANK_HEIGHT / 2) {
          roundedTransX = -roundedTransX;
        }
        if (event.x <= CRANK_WIDTH / 2) {
          roundedTransY = -roundedTransY;
        }

        rotation.value += (roundedTransX + roundedTransY) / ROTATION_THROTTLE;

        if (rotation.value > rotationLimit) {
          rotation.value = rotationLimit;
        }
        if (rotation.value < 0) {
          rotation.value = 0;
        }
      },
    });

  if (!loaded) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.container}>
        <StatusBar translucent style={"light"} />
        <Background>
          <View style={styles.container}>
            <PictureSlider pics={myPics} rotation={rotation} />
            <ImageBackground
              style={styles.frame}
              source={require("./assets/rahmen.png")}
              resizeMode={"stretch"}
            ></ImageBackground>
            <View style={styles.bottomSection}></View>
          </View>
        </Background>
      </View>
      {DIR_PATH === "thorma" ? (
        <AllTheLottiesThorma
          progress={rotation}
          rotationLimit={rotationLimit}
        />
      ) : (
        <AllTheLotties progress={rotation} rotationLimit={rotationLimit} />
      )}

      <Crank gestureHandler={gestureHandler} rotation={rotation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    position: "absolute",
    top: 10,
    height: FRAME_HEIGHT,
    width: WIDTH - 20,
  },
  bottomSection: {
    flex: 1,
  },
});
