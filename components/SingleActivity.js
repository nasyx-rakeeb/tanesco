import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const SingleActivity = ({
  title,
  number,
  date,
  containerStyle,
  status,
  statusColor,
  onPress,
  task,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      <View style={styles.first}>
        <View style={[styles.bar, { backgroundColor: statusColor }]}></View>
        <View styles={styles.infoColumn}>
          <Text style={[styles.infoText, styles.title]}>{title}</Text>
          <Text style={[styles.infoText, styles.number]}>
            Booking number {number}
          </Text>
          <Text style={[styles.infoText, styles.date]}>
            {moment(date).format("dddd, MMMM Do YYYY")}
          </Text>
        </View>
      </View>
      <View style={styles.second}>
        <AntDesign name="right" size={24} color="black" />
      </View>
    </Pressable>
  );
};

export default SingleActivity;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  first: {
    flexDirection: "row",
  },
  second: {
    alignSelf: "center",
  },
  bar: {
    width: 6,
    borderRadius: 50,
    height: "100%",
    marginRight: 12,
  },
  infoColumn: {},
  infoText: {},
  title: {},
  date: { color: "#3c3c4399" },
  number: {
    paddingVertical: 5,
    color: "#3c3c4399",
  },
});
