import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ReText, useSpring } from "react-native-redash";
import LottieView from "lottie-react-native";
import Svg from "react-native-svg";
import AnimatedStroke from "./AnimatedStroke";
import { MAX_SWIPER_SPACE } from "./Constances";

Animated.addWhitelistedNativeProps({ text: true });

const Slide = () => {
  const myText = "Deine Kiddies";
  const transition = useSharedValue(0);
  const animatedText = useDerivedValue(() => {
    const current = Math.round(transition.value);
    return myText.substr(0, current);
  });

  useEffect(() => {
    transition.value = withTiming(myText.length, {
      duration: myText.length * 200,
    });
  }, []);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.slide,
        { backgroundColor: "#105652" },
      ]}
    >
      <View
        style={{
          marginHorizontal: MAX_SWIPER_SPACE,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/wir.jpg")}
          resizeMode={"cover"}
          style={{ width: 250, height: 400, borderRadius: 20 }}
        ></Image>

        <LottieView
          source={require("../assets/love.json")}
          autoPlay={true}
          speed={0.5}
          style={{ width: 150, height: 150 }}
        />
        <ReText
          text={animatedText}
          style={{
            fontSize: 48,
            color: "white",
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
            fontFamily: "Handwritten",
          }}
        />
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  image: {
    height: 500,
    width: 150,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  lottieStyle: {
    width: 50,
    height: 50,
  },
});
