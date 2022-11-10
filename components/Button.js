import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../constants/colors.js";

const Button = ({ title, onPress, loading }) => {
  return (
    <Pressable
      disabled={loading}
      style={({ pressed }) =>
        pressed
          ? [
              styles.root,
              { opacity: 0.7 },
              loading
                ? { backgroundColor: colors.silver }
                : { backgroundColor: colors.green },
            ]
          : [
              styles.root,
              loading
                ? { backgroundColor: colors.silver }
                : { backgroundColor: colors.green },
            ]
      }
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={colors.green} size="small" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 50,
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
  },
});

export default Button;
