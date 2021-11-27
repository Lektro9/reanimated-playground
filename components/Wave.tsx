import MaskedView from "@react-native-community/masked-view";
import React, { ReactElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { clamp, Vector } from "react-native-redash";
import Svg, { Path } from "react-native-svg";
import {
  HEIGHT,
  MAX_SWIPER_SPACE,
  MIN_SWIPER_SPACE,
  WIDTH,
} from "./Constances";

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

export interface WaveProps {
  side: Side;
  children: ReactElement;
  position: Vector<Animated.SharedValue<number>>;
  isTransing: Animated.SharedValue<boolean>;
}

const vector2d = (x: number, y: number) => {
  "worklet";
  return { x, y };
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Wave = ({ side, children, position, isTransing }: WaveProps) => {
  const stepXanim = useDerivedValue(() => {
    const radius = clamp(
      position.x.value,
      MAX_SWIPER_SPACE - MIN_SWIPER_SPACE,
      WIDTH / 3
    );

    return withSpring(isTransing.value ? 0 : radius / 2);
  });
  const animatedProps = useAnimatedProps(() => {
    // imagenary circle
    const radius = clamp(
      position.x.value,
      MAX_SWIPER_SPACE - MIN_SWIPER_SPACE,
      WIDTH / 3
    );
    const stepX = radius / 2;
    // 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
    const magicBezierCircle = radius * 0.5522847498;
    // steps for how far the points are away from each other
    const stepY = Math.max(
      position.x.value,
      MAX_SWIPER_SPACE - MIN_SWIPER_SPACE
    );
    const point1 = vector2d(position.x.value, position.y.value - 2 * stepY);
    const point2 = vector2d(point1.x + stepX, point1.y + stepY);
    const point3 = vector2d(point2.x + stepX, point2.y + stepY);
    const point4 = vector2d(point3.x - stepX, point3.y + stepY);
    const point5 = vector2d(point4.x - stepX, point4.y + stepY);

    const cpoint11 = vector2d(point1.x, point1.y + magicBezierCircle);
    const cpoint12 = vector2d(point2.x, point2.y);

    const cpoint21 = vector2d(point2.x, point2.y);
    const cpoint22 = vector2d(point3.x, point3.y - magicBezierCircle);

    const cpoint31 = vector2d(point3.x, point3.y + magicBezierCircle);
    const cpoint32 = vector2d(point4.x, point4.y);

    const cpoint41 = vector2d(point4.x, point4.y);
    const cpoint42 = vector2d(point5.x, point5.y - magicBezierCircle);

    const d = [
      "M 0 0",
      `H ${point1.x}`,
      `V ${point1.y}`,
      `C ${cpoint11.x} ${cpoint11.y} ${cpoint12.x} ${cpoint12.y} ${point2.x} ${point2.y}`,
      `C ${cpoint21.x} ${cpoint21.y} ${cpoint22.x} ${cpoint22.y} ${point3.x} ${point3.y}`,
      `C ${cpoint31.x} ${cpoint31.y} ${cpoint32.x} ${cpoint32.y} ${point4.x} ${point4.y}`,
      `C ${cpoint41.x} ${cpoint41.y} ${cpoint42.x} ${cpoint42.y} ${point5.x} ${point5.y}`,
      `V ${HEIGHT}`,
      "H 0",
      "Z",
    ];
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

  // if (Platform.OS === "android") {
  //   return (
  //     <View style={StyleSheet.absoluteFill}>
  //       <Svg
  //         style={[
  //           StyleSheet.absoluteFill,
  //           {
  //             transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
  //           },
  //         ]}
  //       >
  //         <AnimatedPath
  //           fill={children.props.data.bgColor}
  //           animatedProps={animatedProps}
  //         />
  //       </Svg>
  //       <Animated.View style={[StyleSheet.absoluteFill, androidStyle]}>
  //         {children}
  //       </Animated.View>
  //     </View>
  //   );
  // }

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
      androidRenderingMode={"software"}
    >
      {children}
    </MaskedView>
  );
};

export default Wave;

const styles = StyleSheet.create({});
