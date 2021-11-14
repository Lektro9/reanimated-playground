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

export interface SlideData {
  data: SlideProps;
}

export interface SlideProps {
  image: string;
  text: string;
  bgColor: string;
}

const Slide = ({ data }: SlideData) => {
  const [slideChanged, setSlideChanged] = useState(false);
  const transition = useSpring(slideChanged, { mass: 2 });

  useEffect(() => {
    setSlideChanged(true);
  }, [data]);

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
        { backgroundColor: data.bgColor },
      ]}
    >
      <Animated.View style={[springImageStyle]}>
        <Image
          source={
            typeof data.image === "string" ? { uri: data.image } : data.image
          }
          style={styles.image}
          resizeMode={"contain"}
        />
      </Animated.View>
      <LottieView
        source={require("../assets/myAnim.json")}
        autoPlay={true}
        style={styles.lottieStyle}
      />
      <Text>{data.text}</Text>
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
