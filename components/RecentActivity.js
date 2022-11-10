import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import TxtBtn from "./TxtBtn";
import SingleActivity from "./SingleActivity";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../store/appStore";

const RecentActivity = ({ style, tasks }) => {
  const navigation = useNavigation();
  const data = tasks
    ? tasks?.sort((a, b) => b.created_at - a.created_at).slice(0, 5)
    : [];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Activity</Text>
        <TxtBtn
          onPress={() => navigation.navigate("Tasks")}
          title="View all"
          textStyle={{ fontSize: 14 }}
        />
      </View>
      <View style={styles.body}>
        {data === null ||
          (data.length === 0 && (
            <Text>No data available, please pull down to resfresh</Text>
          ))}
        {data &&
          data.length > 0 &&
          data.map((item) => {
          {console.log(item)}
            return (
              <SingleActivity
                date={item.created_at}
                number={item.ticket_id}
                status={item.request_status_name}
                statusColor={item.request_status_color}
                title={item.subject}
                key={item.id}
                onPress={() => navigation.navigate("TaskDetails", {
              ticket_id: item.ticket_id,
              title: item.subject,
              date: item.created_at,
              description: item?.description || item.subject,
              name: item.full_name,
              phone: item?.phone,
              zone: item.zone_name,
              region: item.region_name,
              district: item.district_name
                })}
              />
            );
          })}
      </View>
    </View>
  );
};

export default RecentActivity;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    color: "#484848",
  },
  body: {
    marginTop: 10,
  },
});
