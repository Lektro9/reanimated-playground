import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedProps,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type AllTheLottiesProps = {
  progress: Animated.SharedValue<number>;
  rotationLimit: number;
};

const AllTheLotties = ({ progress, rotationLimit }: AllTheLottiesProps) => {
  const animatedPropsWhiteCat = useAnimatedProps(() => ({
    progress: interpolate(progress.value, [0, rotationLimit], [0, 1]),
  }));

  const animatedPropsGreyCat = useAnimatedProps(() => ({
    progress: interpolate(progress.value, [0, rotationLimit], [0, 1]),
  }));

  const animatedPropsChimes = useAnimatedProps(() => ({
    progress: interpolate(progress.value, [0, rotationLimit], [0, 1]),
  }));

  const animatedPropsBunnies = useAnimatedProps(() => ({
    progress: interpolate(progress.value, [0, rotationLimit], [0, 1]),
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <AnimatedLottieView
        source={require("../assets/chimes.json")}
        style={styles.chimes}
        animatedProps={animatedPropsChimes}
      />
      <AnimatedLottieView
        source={require("../assets/whitecat.json")}
        style={styles.whiteCat}
        animatedProps={animatedPropsWhiteCat}
      />
      <AnimatedLottieView
        source={require("../assets/greycat.json")}
        style={styles.greyCat}
        animatedProps={animatedPropsGreyCat}
      />
      <AnimatedLottieView
        source={require("../assets/bunnies.json")}
        style={styles.bunnies}
        animatedProps={animatedPropsBunnies}
      />
    </View>
  );
};

export default AllTheLotties;

const styles = StyleSheet.create({
  bunnies: {
    position: "absolute",
    width: 150,
    right: "10%",
    top: "50%",
  },
  whiteCat: {
    position: "absolute",
    width: 250,
    top: "50%",
  },
  greyCat: {
    position: "absolute",
    width: 75,
    top: 5,
    left: "20%",
    transform: [{ rotate: "0deg" }],
  },
  chimes: {
    position: "absolute",
    width: 150,
    top: "34%",
  },
});
