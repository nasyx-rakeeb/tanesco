import {StyleSheet, Text, View, Image} from "react-native"
import {colors} from "../constants/colors.js"
import Button from "../components/Button.js"

const Welcome = () => {
  return (
    <View style={styles.root}>
    <View style={styles.root2}>
      <Image style={styles.img} source={require("../assets/images/welcome.png")} resizeMode="contain" />
      <View style={styles.txtContainer}>
        <Text style={styles.head1}>Tanesco Tanzania</Text>
        <Text style={styles.head2}>Tunaangaza maisha yako</Text>
      </View>
      <Button title="Log In" onPress={() => console.log(5)} />
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
 root2: {
    flex: .6,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  img: {
    aspectRatio: 1,
    height: undefined,
    width: "85%"
  },
  txtContainer: {
    
  },
  head1: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 24
  },
  head2: {
    color: colors.silver,
    textAlign: "center",
    fontSize: 19
  }
})

export default Welcome