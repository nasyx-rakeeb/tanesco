import { StyleSheet, Text, View } from "react-native";
import { BarChart, StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  convertDateIntoMillSeconds,
  getDayOfWeek,
  getLastWeek,
} from "../utils/date";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "transparent",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "transparent",
  backgroundGradientToOpacity: 0,
  color: () => `black`,
  style: {
    borderRadius: 16,
  },
  strokeWidth: 1,
  propsForLabels: () => "color: 'black'",
  barPercentage: 0.5,
  barRadius: 8,
  useShadowColorFromDataset: false, // optional
  labelColor: () => "black",
  fillShadowGradient: "#009348", // THIS
  backgroundLinesColor: () => "black",
  fillShadowGradientFrom: "#009348", // THIS
  fillShadowGradientTo: "#009348", // THIS
  fillShadowGradientOpacity: 1,
  height: 5000,
  decimalPlaces: 0,
  //   propsForDots: {
  //     r: "0",
  //     strokeWidth: "1",
  //     stroke: "#fff",
  //   },
  propsForBackgroundLines: {
    strokeWidth: 0.3,
    stroke: "gray",
    strokeDasharray: "0",
  },
};
const HomeChart = ({ tasks }) => {
  // console.log(
  //   tasks.map((t) => t.created_at) +
  //     tasks.map((t) => t.request_status_name + "\n")
  // );

  // tasks.map((t) => {
  //   console.log(t.created_at + " " + t.request_status_name + "\n");
  // });
  // console.log(tasks.map((t) => t.created_at + "\n"));
  // console.log(tasks.length);
  const thisWeekTasks = tasks
    .filter(
      (task) =>
        new Date(task.created_at) > new Date(getLastWeek()) &&
        task.request_status_name === "Resolved"
    )
    .sort((a, b) => a.created_at - b.created_at)
    .map((item) => item.created_at);

  const dayOfWeek = thisWeekTasks.map((task) => getDayOfWeek(task.created_at));
  // console.log(thisWeekTasks.map((t) => console.log(t)));
  // console.log(thisWeekTasks.length);

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    datasets: [
      {
        data: [
          dayOfWeek.filter((day) => day === "Sun").length,
          dayOfWeek.filter((day) => day === "Mon").length,
          dayOfWeek.filter((day) => day === "Tue").length,
          dayOfWeek.filter((day) => day === "Wed").length,
          dayOfWeek.filter((day) => day === "Thu").length,
          dayOfWeek.filter((day) => day === "Fri").length,
          dayOfWeek.filter((day) => day === "Sat").length,
        ],
      },
    ],
  };
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>This Week</Text>
        <Text style={styles.number}>{thisWeekTasks.length}</Text>
      </View>
      <Text style={styles.subtitle}>Resolved Tasks</Text>
      <BarChart
        fromZero={true}
        style={styles.graphStyle}
        data={data}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        // showValuesOnTopOfBars={true}
        flatColor={true}
        showBarTops={false}
      />
    </View>
  );
};

export default HomeChart;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderColor: "#989898",
    borderWidth: 0.5,
    borderRadius: 24,
    padding: 10,
  },
  textGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  number: {
    fontSize: 16,
    marginRight: 20,
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 15,
  },
});
