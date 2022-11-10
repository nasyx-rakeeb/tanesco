import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import Button from "../components/Button.js";
import * as React from "react";
import { AppContext } from "../store/appStore.js";

const MyAccount = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const ctx = React.useContext(AppContext);
  const profile = ctx?.profile;
  const [error, setError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")

  const [input, setInput] = React.useState({
    full_name: profile?.full_name || profile?.data?.Profile?.full_name,
    email: profile?.email || profile?.data?.Profile?.email,
    phone: profile?.phone || profile?.data?.Profile?.phone,
    password: "",
  });

  function onChangeHandler(text, type) {
    setInput((prev) => ({ ...prev, [type]: text }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError(false)
    setErrorMsg("")
    const res = await ctx.updateUser(input.full_name, input.phone, input.email, input.password);
    if (res?.data) {
      setLoading(false)
      setError(false)
      setErrorMsg("")
      await ctx.updateLocalUserData(res.data)
      Alert.alert("SUCCESS", "Your profile was updated successfully!")
      ctx.setIsProfileEditing(false)
      return
    } else {
      setErrorMsg(res?.error?.email || res?.message || "Error occurred while updating the profile")
      setError(true)
      setLoading(false)
      return
    } 
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.txt1}>Full Name</Text>
        <TextInput
          editable={ctx.isProfileEditing}
          value={input.full_name}
          style={styles.input}
          onChangeText={(t) => onChangeHandler(t, "full_name")}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt1}>Phone Number</Text>
        <TextInput
          editable={ctx.isProfileEditing}
          value={input.phone}
          style={styles.input}
          onChangeText={(t) => onChangeHandler(t, "phone")}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt1}>Email</Text>
        <TextInput
          editable={ctx.isProfileEditing}
          value={input.email}
          style={styles.input}
          onChangeText={(t) => onChangeHandler(t, "email")}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt1}>Password</Text>
        <TextInput
          editable={ctx.isProfileEditing}
          value={input.password}
          secureTextEntry
          style={styles.input}
          onChangeText={(t) => onChangeHandler(t, "password")}
        />
      </View>
      <View style={styles.btnContainer}>
        {ctx.isProfileEditing && (
          <Button title="Save" onPress={handleSubmit} loading={loading} />
        )}
        {error && (<Text style={{textAlign: "center", marginVertical: 20, color: "red", marginHorizontal: 8}}>{errorMsg}</Text>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    paddingVertical: 2,
    width: "90%",
    color: "#000",
  },
  txt1: {
    alignSelf: "flex-start",
    paddingLeft: "5%",
    color: "gray",
    fontSize: 12,
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 12,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});

export default MyAccount;
