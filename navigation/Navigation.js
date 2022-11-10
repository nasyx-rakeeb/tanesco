import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AppContext } from "../store/appStore";
import { useContext, useLayoutEffect } from "react";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import LoadingScreen from "../screens/LoadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = "#fff";

export default function Navigation() {
  const ctx = useContext(AppContext);
  const isLoading = ctx?.isLoading;

  const isUserLoggedIn = ctx?.token;

  console.log("IS USER LOGGED IN" + isUserLoggedIn + isLoading);
  // console.log(ctx?.tasks);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn !== null ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
