import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FirstSlide from "./components/FirstSlide";
import SecondSlide from "./components/SecondSlide";
import Slide from "./components/Slide";
import Slider from "./components/Slider";
import ThirdSlide from "./components/ThirdSlide";

const slides = [FirstSlide, SecondSlide, ThirdSlide];

export default function App() {
  const [index, setIndex] = useState(0);
  const Prev = slides[index - 1];
  const Next = slides[index + 1];
  const Current = slides[index];
  const [loaded] = useFonts({
    Handwritten: require("./assets/SignPainterHouseScriptRegular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Slider
        index={index}
        setIndex={setIndex}
        prev={Prev && <Prev isActive={false} />}
        next={Next && <Next isActive={false} />}
      >
        <Current isActive={true} />
      </Slider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
