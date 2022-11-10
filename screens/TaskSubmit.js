import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { colors } from "../constants/colors.js";
import { RadioButton } from "react-native-paper";
import * as React from "react";
import Button from "../components/Button.js";
import { update } from "../services/authServices.js";
import { AppContext } from "../store/appStore.js";

const TaskSubmit = ({ navigation, route }) => {
  const ctx = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [resolution, setResolution] = React.useState("");
  const ticket_id = route?.params?.ticket_id;
  const taskTitle = route?.params?.title;
  const [errorMsg, setErrorMsg] = React.useState("");
  const [error, setError] = React.useState(false);
  const date = route?.params?.date;
  const name = route?.params?.name;
  const address = route?.params?.address;
  const description = route?.params?.description;
  const phone = route?.params?.phone;

  const submitHandler = async () => {
    setLoading(true);
    const token = ctx.token;
    const res = await update(token, ticket_id, status, resolution);
    if (res.data.status === "success") {
      setLoading(false);
      await ctx.refreshTasks();
      Alert.alert("SUCCESS", "Submission was successful!");
      navigation.navigate("TaskDetails", {
        ticket_id: ticket_id,
        title: taskTitle,
        comments: resolution,
        address: address,
        date: date,
        description: description,
        phone: phone,
        name: name,
      });
    } else {
      setLoading(false);
      setError(true);
      setErrorMsg(res.data.status);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>{taskTitle}</Text>
      <Text style={{ color: "gray" }}>Ticket Number #{ticket_id}</Text>
      <View style={styles.middle}>
        <Text style={{ marginBottom: 14, fontSize: 16 }}>Resolution</Text>
        <TextInput
          style={styles.desc}
          value={resolution}
          onChangeText={(value) => setResolution(value)}
          multiline={true}
          placeholder="Task Completion Comments"
          numberOfLines={8}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={{ marginBottom: 14, fontSize: 16 }}>Select Status</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setStatus(newValue)}
          value={status}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="In Progress" />
            <Text style={{ color: "gray" }}>In Progress</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="OnHold" />
            <Text style={{ color: "gray" }}>Onhold</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="Resolved" />
            <Text style={{ color: "gray" }}>Resolved</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={{ marginTop: 34, alignItems: "center", width: "100%" }}>
        <Button
          title="Submit"
          loading={loading}
          onPress={() =>
            Alert.alert(
              "CONFIRM",
              "Are you sure you want to submit this task?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: submitHandler,
                },
              ]
            )
          }
        />
        {error && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginHorizontal: 15,
              marginVertical: 20,
            }}
          >
            {errorMsg}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  middle: {
    marginVertical: 34,
  },
  desc: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 24,
    textAlignVertical: "top",
    padding: 14,
    color: "gray",
  },
});

export default TaskSubmit;
