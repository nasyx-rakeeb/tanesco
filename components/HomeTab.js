import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

const HomeTab = ({ style, children, text, number }) => {
  return (
    <View style={[styles.tab, style]}>
      <View style={styles.iconText}>
        {children}
        <Text style={styles.text}>{text}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 14, color: "#333333" }}>{number}</Text>
      </View>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 50,
  },
  text: {
    marginLeft: 5,
    fontSize: 15,
    color: "#333333",
  },
});
