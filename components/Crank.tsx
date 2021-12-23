import React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type CrankProps = {
  rotation: Animated.SharedValue<number>;
  gestureHandler: OnGestureEvent<PanGestureHandlerGestureEvent>;
};

const Crank = ({ rotation, gestureHandler }: CrankProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <>
      <Animated.Image
        source={require("../assets/crank.png")}
        style={[styles.crankFrame, animatedStyle]}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.outerBounds}></Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Crank;

const styles = StyleSheet.create({
  crankFrame: {
    position: "absolute",
    width: 150,
    height: 150,
    bottom: 40,
    right: "5%",
  },
  outerBounds: {
    position: "absolute",
    width: 150,
    height: 150,
    bottom: 40,
    right: "5%",
  },
});
