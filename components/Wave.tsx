import MaskedView from "@react-native-community/masked-view";
import React, { ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import Svg, { Path } from "react-native-svg";
import { HEIGHT, WIDTH } from "./constances";

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

export interface WaveProps {
  side: Side;
  children: ReactElement;
  position: Vector<Animated.SharedValue<number>>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Wave = ({ side, children, position }: WaveProps) => {
  const animatedProps = useAnimatedProps(() => {
    const d = ["M 0 0", `H ${position.x.value}`, `V ${HEIGHT}`, "H 0", "Z"];
    return {
      d: d.join(" "),
    };
  });

  const androidStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            side === Side.LEFT
              ? -WIDTH + position.x.value
              : side === Side.RIGHT
              ? WIDTH - position.x.value
              : 0,
        },
      ],
    };
  });

  if (Platform.OS === "android") {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Svg
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
            },
          ]}
        >
          <AnimatedPath
            fill={children.props.data.bgColor}
            animatedProps={animatedProps}
          />
        </Svg>
        <Animated.View style={[StyleSheet.absoluteFill, androidStyle]}>
          {children}
        </Animated.View>
      </View>
    );
  }

  return (
    <MaskedView
      style={StyleSheet.absoluteFill}
      maskElement={
        <Svg
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
            },
          ]}
        >
          <AnimatedPath fill="black" animatedProps={animatedProps} />
        </Svg>
      }
    >
      {children}
    </MaskedView>
  );
};

export default Wave;

const styles = StyleSheet.create({});
