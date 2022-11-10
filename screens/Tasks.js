import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import TaskTabGroup from "../components/TaskTabGroup";
import SingleActivity from "../components/SingleActivity";
import TxtBtn from "../components/TxtBtn";
import { AppContext } from "../store/appStore";
import { searchTicket } from "../services/authServices";
import { useFocusEffect } from "@react-navigation/native";

const Tasks = ({ route, navigation }) => {
  const ctx = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState(ctx?.tasks);
  const [ticket_id, setTicket_id] = useState("");

  const isDataEmpty = !data || data.length === 0;
  // let isSearch = route?.params?.search;
  let isSearch = ctx.isSearchOpen;

  // run when screen goesout of focus
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        ctx.setIsSearchOpen(false);
      };

      return () => unsubscribe();
    }, [])
  );

  async function handleSeach() {
    setRefreshing(true);
    const token = ctx?.token;
    const res = await searchTicket(ticket_id, token);
    setData([
      {
        phone: res.data.client_details.phone,
        full_name: res.data.client_details.name,
        date: res.data.created_date.display_value,
        description: res.data.description,
        ticket_id: res.data.ticket_id,
        subject: res.data.ticket_subject,
        id: res.data.status.id,
        request_status_color: res.data.status.color,
      },
    ]);
    setRefreshing(false);
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const tasks = await ctx.refreshTasks();
    setData(tasks);
    setActiveTab(0);
    setRefreshing(false);
  }, []);

  function handleTabPress(id) {
    setActiveTab(id);
    if (id === 0) {
      setData(ctx.tasks);
    }
    if (id === 1) {
      const data = ctx.tasks.filter(
        (item) => item.request_status_name === "In Progress"
      );
      setData(data);
    }
    if (id === 2) {
      const data = ctx.tasks.filter(
        (item) => item.request_status_name === "Onhold"
      );
      setData(data);
    }
    if (id === 3) {
      const data = ctx.tasks.filter(
        (item) => item.request_status_name === "Resolved"
      );
      setData(data);
    }
  }

  const searchBar = (
    <View style={styles.searchBar}>
      <TextInput
        style={{ flex: 1 }}
        value={ticket_id}
        onChangeText={(t) => setTicket_id(t)}
      />
      <TxtBtn
        title={"search"}
        onPress={handleSeach}
        textStyle={{ fontSize: 15 }}
      />
    </View>
  );

  const fallBackUi = (
    <View style={[styles.fallbackContainer, {opacity: isSearch ? 0 : 1}]}>
      <Image
        source={require("../assets/images/notasks.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Tasks that you add will appear here</Text>
      <Text style={styles.text}>Pull down to refresh</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabGroup}>
        {isSearch ? (
          searchBar
        ) : (
          <TaskTabGroup onTabPress={handleTabPress} activeTab={activeTab} />
        )}
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{ padding: 10 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SingleActivity
            date={item.created_at}
            number={item.ticket_id}
            status={item.request_status_name}
            statusColor={item.request_status_color}
            title={item.subject}
            key={item.id}
            onPress={() =>
              navigation.navigate("TaskDetails", {
                ticket_id: item.ticket_id,
                title: item.subject,
                date: item.created_at,
                description: item?.description || item.subject,
                name: item.full_name,
                phone: item?.phone,
                zone: item?.zone_name,
                region: item?.region_name,
                district: item?.district_name,
              })
            }
          />
        )}
      />
      {isDataEmpty && fallBackUi}

      {/* )} */}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  tabGroup: {
    backgroundColor: "rgba(118, 118, 128, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
  },
  fallbackContainer: {
    position: "absolute",
    flexDirection: "column",
    left: "23%",
    bottom: "30%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
    height: "50%",
  },
  text: {
    paddingBottom: 100,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
