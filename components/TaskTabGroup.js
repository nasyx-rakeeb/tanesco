import { Pressable, StyleSheet, Text, View } from "react-native";

const TaskTabGroup = ({ onTabPress, activeTab }) => {
  function pressHandler(id) {
    onTabPress(id);
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={pressHandler.bind(this, 0)}>
        <Text style={activeTab === 0 && [styles.activeStyle]}>All</Text>
      </Pressable>
      <View style={[styles.verticalLine]}></View>
      <Pressable onPress={pressHandler.bind(this, 1)}>
        <Text style={activeTab === 1 && styles.activeStyle}>In Progress</Text>
      </Pressable>
      <View style={styles.verticalLine}></View>
      <Pressable onPress={pressHandler.bind(this, 2)}>
        <Text style={activeTab === 2 && styles.activeStyle}>On Hold</Text>
      </Pressable>
      <View style={styles.verticalLine}></View>
      <Pressable onPress={pressHandler.bind(this, 3)}>
        <Text style={activeTab === 3 && styles.activeStyle}>Resolved</Text>
      </Pressable>
    </View>
  );
};

export default TaskTabGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  verticalLine: {
    width: 1,
    height: "70%",
    backgroundColor: "rgba(60, 60, 67, 0.36)",
  },
  activeStyle: {
    // backgroundColor: "white",
    // width: "100%",
    // paddingVertical: 3,
    // paddingHorizontal: 10,
    // borderRadius: 50,
    color: "green",
  },
});
