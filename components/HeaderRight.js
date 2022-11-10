import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useContext, useRef, useState } from "react";
import TxtBtn from "./TxtBtn";
import { AppContext } from "../store/appStore";

const HeaderRight = ({ navigation }) => {
  const { isSearchOpen, setIsSearchOpen } = useContext(AppContext);

  function onPress() {
    navigation.navigate("Tasks", { search: isSearchOpen });
    setIsSearchOpen((prev) => !prev);
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.search} onPress={onPress}>
        {isSearchOpen ? (
          <TxtBtn
            title="cancel"
            textStyle={{ marginRight: 10, fontSize: 15 }}
            onPress={onPress}
          />
        ) : (
          <AntDesign name="search1" size={22} color="#009348" />
        )}
      </Pressable>
      {/* <Pressable style={styles.plus}>
        <AntDesign name="plussquareo" size={22} color="#009348" />
      </Pressable> */}
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    flexDirection: "row",
  },
  plus: {
    marginLeft: 15,
  },
});
