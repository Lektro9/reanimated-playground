import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSpring } from "react-native-redash";
import LottieView from "lottie-react-native";
import Svg from "react-native-svg";
import AnimatedStroke from "./AnimatedStroke";
import { MAX_SWIPER_SPACE } from "./Constances";

const Slide = () => {
  const [slideChanged, setSlideChanged] = useState(false);
  const transition = useSpring(slideChanged, { mass: 2 });

  useEffect(() => {
    setSlideChanged(true);
  }, []);

  const springImageStyle = useAnimatedStyle(() => {
    const imageScale = interpolate(transition.value, [0, 1], [0, 1]);

    return {
      transform: [{ scale: imageScale }],
    };
  });

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.slide,
        { backgroundColor: "#B91646" },
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
        <Text
          style={{
            fontSize: 36,
            color: "white",
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
            fontFamily: "Handwritten",
            textAlign: "center",
          }}
        >
          Wir hoffen das Geschenk gefällt dir!
        </Text>
        <LottieView
          source={require("../assets/phone.json")}
          autoPlay={true}
          speed={0.5}
          style={{ width: 250, height: 250 }}
        />
      </View>

      <LottieView
        source={require("../assets/confetti.json")}
        autoPlay={true}
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "center", alignItems: "center" },
        ]}
      />
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
