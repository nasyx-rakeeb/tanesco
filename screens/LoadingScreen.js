import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import {colors} from "../constants/colors.js"

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={colors.green} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
