import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { mixColor } from "react-native-redash";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({ d, animatedValue }) => {
  const [length, setLength] = useState(0);
  const ref = useRef<typeof AnimatedPath>(null);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.65, 0, 0.35, 1)(animatedValue.value),
    fill: mixColor(
      Easing.bezier(0.65, 0, 0.35, 1)(animatedValue.value),
      "transparent",
      "black"
    ),
  }));
  return (
    <AnimatedPath
      ref={ref}
      onLayout={() => {
        setLength(ref.current.getTotalLength());
      }}
      d={d}
      stroke="black"
      strokeDasharray={length}
      animatedProps={animatedProps}
    />
  );
};

export default AnimatedStroke;

const styles = StyleSheet.create({});
