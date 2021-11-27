import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slide from "./components/Slide";
import Slider from "./components/Slider";

const slides = [
  {
    image: "https://reactnative.dev/img/tiny_logo.png",
    text: "Dies ist mein erster Slide!",
    bgColor: "#9fdae2",
  },
  {
    image:
      "https://static.wikia.nocookie.net/streetfighter/images/1/14/PXZ-Ken.png/revision/latest/scale-to-width-down/211?cb=20191211074019",
    text: "Dies ist mein zweiter Slide!",
    bgColor: "#ea632c",
  },
  {
    image: require("./assets/kazuya.png"),
    text: "Dies ist der dritte Slide!",
    bgColor: "#d7d4cd",
  },
];

export default function App() {
  const [index, setIndex] = useState(1);
  const prev = slides[index - 1];
  const next = slides[index + 1];

  return (
    <View style={styles.container}>
      <Slider
        index={index}
        setIndex={setIndex}
        prev={prev && <Slide data={prev} />}
        next={next && <Slide data={next} />}
      >
        <Slide data={slides[index]} />
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
