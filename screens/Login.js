import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { colors } from "../constants/colors.js";
import Button from "../components/Button.js";
import TxtBtn from "../components/TxtBtn.js";
import { useContext, useState } from "react";
import { signin } from "../services/authServices.js";
import { AppContext } from "../store/appStore.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ctx = useContext(AppContext);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    if (!username || username.length < 3 || !password || password.length < 6) {
      setError("Invalid Credentials Entered");
      return setLoading(false);
    }
    const data = await signin(username, password);
    if (data?.token) {
      ctx.login(data, data?.token);
      setError(null);
      setLoading(false);
    } else {
      setLoading(false);
      setError(data?.message);
    }
  };

  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
      />
      <Text style={styles.txt}>Log In</Text>
      <View style={styles.inputContainer}>
        <View style={[styles.inputBox, { marginBottom: 20 }]}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(t) => setUsername(t)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(t) => setPassword(t)}
          />
        </View>
        <View style={styles.btnContainer2}>
          <TxtBtn title="Forgot Password?" textStyle={{ fontSize: 12 }} />
        </View>
      </View>
      <Button title="Log In" onPress={handleSubmit} loading={loading} />
      {error && (
        <Text
          style={{
            color: "red",
            marginTop: 15,
            marginHorizontal: 15,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 50,
    width: "90%",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "silver",
    width: "90%",
    paddingVertical: 2,
  },
  txt: {
    fontSize: 30,
  },
  inputBox: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    color: "silver",
    fontSize: 12,
  },
  btnContainer2: {
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: 8,
  },
  image: {
    width: "40%",
    height: "20%",
  },
});

export default Login;
