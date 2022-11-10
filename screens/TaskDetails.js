import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "../components/Button.js";
import { colors } from "../constants/colors.js";
import * as React from "react";
import moment from "moment"

const TaskDetails = ({ navigation, route }) => {
  const ticket_id = route?.params?.ticket_id
  const title = route?.params?.title
  const date = route?.params?.date
  const name = route?.params?.name
  const phone = route?.params?.phone
  const zone = route?.params?.zone
  const region = route?.params?.region
  const district = route?.params?.district
  const description = route?.params?.description
  const comments = route?.params?.comments
  let address 
  if (region) {
    address = `${region} ${district} - ${zone}`
  } else {
    address = route?.params?.address
  }
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Text style={{ color: colors.green, fontSize: 24 }}>
            {title}
          </Text>
          <Text style={{ color: "gray", marginVertical: 8 }}>
            Ticket Number #{ticket_id}
          </Text>
          <Text style={{ color: "gray" }}> {moment(date).format("dddd, MMMM Do YYYY")}</Text>
        </View>
        <View style={styles.middle}>
          <Text>
            Requested by:{" "}
            <Text style={{ color: "grey" }}>{name}</Text>
          </Text>
          <Text style={{ marginVertical: 8 }}>
            Contact:{" "}
            <Text
              style={{
                color: "grey",
                color: colors.green,
                textDecorationLine: "underline",
              }}
            >
              {phone}
            </Text>
          </Text>
          <Text>
            Address: <Text style={{ color: "grey" }}>{address}</Text>
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>Description</Text>
          <Text style={{ color: "grey", lineHeight: 28 }}>
            {description}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Submit"
            onPress={() => navigation.navigate("TaskSubmit", {
            ticket_id: ticket_id, 
            title: title,
            date: date,
            name: name,
            address: address,
            description: description,
            address: address
            })}
          />
        </View>
        {comments && <View style={styles.commentContainer}>
          <Text
            style={{ alignSelf: "flex-start", fontSize: 18, marginTop: 34 }}
          >
            My Comments
          </Text>
          <View style={styles.myComments}>
            <Text style={styles.comment}>
              {comments}
            </Text>
          </View>
        </View>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 15,
    width: "100%"
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
  },
  top: {
    marginBottom: 35,
    width: "100%"
  },
  middle: {
    marginBottom: 35,
    width: "100%"
  },
  bottom: {
    marginBottom: 30,
    width: "100%",
  },
  myComments: {
    backgroundColor: "#ededed",
    borderRadius: 30,
    padding: 14,
    alignSelf: "center",
    marginVertical: 12,
    width: "100%",
  },
  comment: {
    lineHeight: 22,
    fontSize: 12,
  },
  commentContainer: {
    alignItems: "center",
    width: "100%"
  },
});

export default TaskDetails;
