import { StyleSheet, Text, View, Image } from "react-native";
import React, { Children } from "react";
import Svg, { Circle, Path } from "react-native-svg";
import MaskedView from "@react-native-community/masked-view";

export default function Heart(props) {
  return (
    <MaskedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
      pointerEvents="none"
      maskElement={
        <Svg viewBox="0 0 80 65" style={{ backgroundColor: "rgba(0,0,0,0)" }}>
          <Path
            d="M 40 10 C 70 -20 100 30 40 60 C -20 30 10 -20 40 10"
            stroke={"rgba(1,1,1,0.3)"}
            strokeWidth={5}
            fill={"black"}
          ></Path>
        </Svg>
      }
    >
      {/* Shows behind the mask, you can put anything here, such as an image */}
      {props.children}
    </MaskedView>

    /**<Svg viewBox="0 0 80 65" style={{ backgroundColor: "transparent" }}>
      <Path
        d="M 40 10 C 70 -20 100 30 40 60 C -20 30 10 -20 40 10"
        stroke={"black"}
        strokeWidth={1}
      ></Path>
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        style={styles.tinyLogo}
      ></Image>
    </Svg>**/
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
  },
});
