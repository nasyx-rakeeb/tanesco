import { StyleSheet, View } from "react-native";
import { colors } from "./constants/colors.js";
import Navigation from "./navigation/Navigation";
import AppContextProvider from "./store/appStore.js";

const App = () => {
  return (
    <View style={styles.root}>
      <AppContextProvider>
        <Navigation />
      </AppContextProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default App;
