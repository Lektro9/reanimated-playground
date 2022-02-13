import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import Heart from "./components/Heart";
import { Camera } from "expo-camera";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";

const colors = {
  red: "#b11d4d",
  pink: "#fd6fa0",
  purple: "#e986a3",
  blue: "#e6f5f8",
  green: "#81a04a",
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [picture, setPicture] = useState("");
  const [sound, setSound] = useState<Audio.Sound>(null);
  const camera = useRef<Camera>(null);
  const lottieAnim = useRef<LottieView>(null);
  const animation = useSharedValue(1);
  const [loaded] = useFonts({
    Handwritten: require("./assets/SignPainterHouseScriptRegular.ttf"),
  });

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/saxo.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
  }

  useEffect(() => {
    if (picture) {
      animation.value = withRepeat(withSpring(1.2), 0, true);
      lottieAnim.current?.play();
      playSound();
    }
  }, [picture]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animation.value }],
    };
  });
  if (!loaded) {
    return null;
  }
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text style={styles.font}>Kamera nicht zugelassen.</Text>
      </View>
    );
  }

  const takePictureAndRender = () => {
    camera.current?.takePictureAsync().then((data) => {
      setPicture(data.uri);
    });
  };

  return (
    <View style={[StyleSheet.absoluteFill]}>
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.pink }]}
      />
      <Animated.View style={[styles.container, animatedStyles]}>
        <Heart>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.photo}></Image>
          ) : (
            <Camera
              ref={camera}
              style={styles.tinyLogo}
              type={Camera.Constants.Type.front}
              ratio="16:9"
            ></Camera>
          )}
        </Heart>
      </Animated.View>
      <LottieView
        ref={lottieAnim}
        source={require("./assets/flyingH.json")}
        autoPlay={false}
        speed={1}
        style={StyleSheet.absoluteFill}
        autoSize={false}
        resizeMode={"cover"}
      />
      {picture ? (
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.topTextContainer}>
            <Text style={styles.font}>Тасячик 😘</Text>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.font}>Sei mein Valentine!</Text>
          </View>
        </View>
      ) : (
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.topTextContainer}>
            <Text style={styles.font}>Erstelle ein Foto mit mir</Text>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.font}></Text>
          </View>
        </View>
      )}

      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={takePictureAndRender}
      ></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSection: {
    flex: 1,
  },
  tinyLogo: {
    flex: 1,
    width: "110%",
  },
  photo: {
    flex: 1,
    width: "100%",
  },
  font: {
    fontFamily: "Handwritten",
    fontSize: 42,
    lineHeight: 60,
  },
  topTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
