import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import TabGroup from "../components/TabGroup";
import RecentActivity from "../components/RecentActivity";
import HomeChart from "../components/HomeChart";
import { AppContext } from "../store/appStore";

const Home = () => {
  const { tasks, refreshTasks } = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const tasks = await refreshTasks();
    setRefreshing(false);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <TabGroup tasks={tasks} />
          <HomeChart tasks={tasks} />
          <RecentActivity style={{ marginTop: 20 }} tasks={tasks} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
