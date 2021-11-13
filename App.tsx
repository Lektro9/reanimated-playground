import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slide from './components/Slide';
import Slider from './components/Slider';

export default function App() {
  const [index, setIndex] = useState(1)

  const slides = [
    {
      image: "https://reactnative.dev/img/tiny_logo.png",
      text: "Dies ist mein erster Slide!",
    },
    {
      image: "https://static.wikia.nocookie.net/streetfighter/images/1/14/PXZ-Ken.png/revision/latest/scale-to-width-down/211?cb=20191211074019",
      text: "Dies ist mein zweiter Slide!",
    }
  ]

  return (
    <View style={styles.container}>
      <Slider index={index} setIndex={setIndex} >
        <Slide data={slides[index]} />
      </Slider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

