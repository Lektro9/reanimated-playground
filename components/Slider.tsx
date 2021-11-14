import React, { ReactElement, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useVector } from "react-native-redash";
import { LEFT_SWIPER_SPACE, RIGHT_SWIPER_SPACE, WIDTH } from "./constances";
import { SlideProps } from "./Slide";
import Wave, { Side } from "./Wave";

export interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  children: ReactElement<SlideProps>;
  prev?: ReactElement<SlideProps>;
  next?: ReactElement<SlideProps>;
}

const Slider = ({ index, setIndex, children, prev, next }: SliderProps) => {
  const activeSide = useSharedValue(Side.LEFT);
  const left = useVector();
  const right = useVector();

  const gestureHandler = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      if (x < LEFT_SWIPER_SPACE) {
        activeSide.value = Side.LEFT;
      } else if (x > WIDTH - RIGHT_SWIPER_SPACE) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({ x, y }) => {
      if (activeSide.value === Side.LEFT) {
        left.x.value = x;
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        right.x.value = WIDTH - x;
        right.y.value = y;
      }
    },
  });

  useEffect(() => {
    right.x.value = withSpring(RIGHT_SWIPER_SPACE);
    left.x.value = withSpring(LEFT_SWIPER_SPACE);
  }, []);

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: activeSide.value === Side.LEFT ? 100 : 0,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {children}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
            <Wave side={Side.LEFT} position={left}>
              {prev}
            </Wave>
          </Animated.View>
        )}
        {next && (
          <Animated.View style={StyleSheet.absoluteFill}>
            <Wave side={Side.RIGHT} position={right}>
              {next}
            </Wave>
          </Animated.View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;

const styles = StyleSheet.create({});
