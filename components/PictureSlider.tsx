import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { pictureType } from "../App";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const FRAME_WIDTH = WIDTH - 40;
const FRAME_HEIGHT = HEIGHT < 668 ? HEIGHT / 2 : HEIGHT / 2.5;

type PictureSliderProps = {
  pics: pictureType[];
  rotation: Animated.SharedValue<number>;
};

const PictureSlider = ({ pics, rotation }: PictureSliderProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          rotation.value,
          [0, pics.length * 360],
          [0, pics.length * -FRAME_WIDTH]
        ),
      },
    ],
  }));
  return (
    <View style={styles.insideFrame}>
      <Animated.View style={[styles.slider, animatedStyle]}>
        {pics.map((pic, index) => (
          <Image
            key={pic.picPath.toString()}
            source={pic.picPath}
            style={{
              width: WIDTH - 40,
              height: undefined,
              backgroundColor: "red",
            }}
            resizeMode="contain"
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default PictureSlider;

const styles = StyleSheet.create({
  insideFrame: {
    width: WIDTH - 40,
    height: FRAME_HEIGHT - 30,
    position: "absolute",
    top: 25,
    borderRadius: 20,
    overflow: "hidden",
  },
  slider: {
    flex: 1,
    flexDirection: "row",
  },
});
