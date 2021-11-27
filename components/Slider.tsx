import React, { ReactElement, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint, useVector } from "react-native-redash";
import {
  HEIGHT,
  MAX_SWIPER_SPACE,
  MIN_SWIPER_SPACE,
  WIDTH,
} from "./Constances";
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
  const hasPrev = !!prev;
  const hasNext = !!next;
  const activeSide = useSharedValue(Side.LEFT);
  const left = useVector(0, HEIGHT / 2);
  const right = useVector(0, HEIGHT / 2);
  const isTransingLeft = useSharedValue(false);
  const isTransingRight = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      if (x < MAX_SWIPER_SPACE && hasPrev) {
        activeSide.value = Side.LEFT;
      } else if (x > WIDTH - MAX_SWIPER_SPACE && hasNext) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({ x, y }) => {
      if (activeSide.value === Side.LEFT) {
        left.x.value = Math.max(x, MIN_SWIPER_SPACE);
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        right.x.value = Math.max(WIDTH - x, MIN_SWIPER_SPACE);
        right.y.value = y;
      }
    },
    onEnd: ({ x, velocityX, velocityY }) => {
      if (activeSide.value === Side.LEFT) {
        const snapPoints = [MIN_SWIPER_SPACE, WIDTH];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransingLeft.value = dest === WIDTH;
        left.y.value = withSpring(HEIGHT / 2);
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransingLeft.value ? true : false,
            restSpeedThreshold: isTransingLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransingLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransingLeft.value) {
              runOnJS(setIndex)(index - 1);
            }
          }
        );
      } else if (activeSide.value === Side.RIGHT) {
        const snapPoints = [WIDTH - MIN_SWIPER_SPACE, 0];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransingRight.value = dest === 0;
        right.y.value = withSpring(HEIGHT / 2);
        right.x.value = withSpring(
          WIDTH - dest,
          {
            velocity: -velocityX,
            overshootClamping: isTransingRight.value ? true : false,
            restSpeedThreshold: isTransingRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransingRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransingRight.value) {
              runOnJS(setIndex)(index + 1);
            }
          }
        );
      }
    },
  });

  useEffect(() => {
    right.x.value = 0;
    left.x.value = 0;
    right.x.value = withSpring(MIN_SWIPER_SPACE);
    left.x.value = withSpring(MIN_SWIPER_SPACE);
  }, [index, left, right]);

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: activeSide.value === Side.LEFT ? 100 : 0,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {children}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
            <Wave side={Side.LEFT} position={left} isTransing={isTransingLeft}>
              {prev}
            </Wave>
          </Animated.View>
        )}
        {next && (
          <Animated.View style={StyleSheet.absoluteFill}>
            <Wave
              side={Side.RIGHT}
              position={right}
              isTransing={isTransingRight}
            >
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
