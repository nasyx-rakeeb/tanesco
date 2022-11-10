import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { AppContext } from "../store/appStore";

const MyAccountHeaderRight = () => {
  const ctx = useContext(AppContext);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.25 : 1 },
      ]}
      onPress={() => ctx.setProfileState(!ctx.isProfileEditing)}
    >
      <Text style={styles.text}>
        {ctx.isProfileEditing ? "Cancel" : "Edit"}
      </Text>
    </Pressable>
  );
};

export default MyAccountHeaderRight;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  text: {
    color: colors.green,
  },
});
