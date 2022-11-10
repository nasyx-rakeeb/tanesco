import {StyleSheet, Text, View, Pressable} from "react-native" 
import {colors} from "../constants/colors.js" 

const IconTxtBtn = ({title, icon, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
    {icon}
      <Text style={styles.txt}>{title}</Text>
    </Pressable>
    )
}

export default IconTxtBtn

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    marginLeft: 10,
    fontSize: 18
  }
})