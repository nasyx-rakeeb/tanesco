import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import MyAccountHeaderRight from "../components/MyAccountHeaderRight";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HeaderRight from "../components/HeaderRight";
import MyAccount from "../screens/MyAccount";
import TaskDetails from "../screens/TaskDetails";
import TaskSubmit from "../screens/TaskSubmit";
import Home from "../screens/Home";
import Tasks from "../screens/Tasks";
import Profile from "../screens/Profile";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Profile":
      return "My Profile";
    case "Tasks":
      return "My Tasks";
  }
}

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTitleStyle: {
          fontSize: 20,

          fontWeight: "bold",
        },
        headerRight: ({}) => {
          return <HeaderRight route={route} navigation={navigation} />;
        },
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
        },

        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      })}
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          headerRight: () => <MyAccountHeaderRight />,
          headerTitle: "My Account"
        }}
      />
      <Stack.Screen name="TaskDetails" component={TaskDetails} options={{headerTitle: "Task Details"}} />
      <Stack.Screen name="TaskSubmit" component={TaskSubmit} options={{headerTitle: "Submit Task"}} />
    </Stack.Navigator>
  );
};

export default HomeStack;

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#009348",
        tabBarInactiveTintColor: "#989898",
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
        },

        headerRight: ({}) => {
          return <HeaderRight />;
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        initialParams={{ search: false }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tasks" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
