import React from "react";
import { StyleSheet, Image, View, ImageBackground } from "react-native";

const Background = ({ children }) => {
  return (
    <View style={[StyleSheet.absoluteFill]}>
      <ImageBackground
        style={StyleSheet.absoluteFill}
        source={require("../assets/background.png")}
        resizeMode={"stretch"}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
