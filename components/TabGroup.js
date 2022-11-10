import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import HomeTab from "./HomeTab";

const TabGroup = ({ tasks }) => {
  const resolved = tasks.filter(
    (task) => task.request_status_name === "Resolved"
  ).length;
  const inprogress = tasks.filter(
    (task) => task.request_status_name === "In Progress"
  ).length;
  const onHold = tasks.filter(
    (task) => task.request_status_name === "Onhold"
  ).length;

  return (
    <View style={styles.container}>
      <HomeTab number={inprogress} text="In Progress">
        <MaterialCommunityIcons
          name="access-point"
          size={20}
          color="#009348"
        />
      </HomeTab>
      <View style={styles.innerContainer}>
        <HomeTab style={{ width: "49%" }} number={resolved} text="Resolved">
          <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={20} color="#009348" />
        </HomeTab>
        <HomeTab style={{ width: "49%" }} number={onHold} text="On Hold">
          <MaterialCommunityIcons name="credit-card-clock" size={20} color="#009348" />
        </HomeTab>
      </View>
    </View>
  );
};

export default TabGroup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  innerContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
});
