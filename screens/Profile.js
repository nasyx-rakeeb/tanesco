import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext } from "react";
import { colors } from "../constants/colors.js";
import IconTxtBtn from "../components/IconTxtBtn.js";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { AppContext } from "../store/appStore.js";
import { logout } from "../services/authServices.js";

const Profile = ({ navigation }) => {
  const ctx = useContext(AppContext);
  const profile = ctx.profile;

  let profileInitial = ":-;";

  if (profile?.full_name) {
    profileInitial = profile.full_name.split("")[0];
  } else if (profile?.data?.Profile?.full_name) {
    profileInitial = profile.data.Profile.full_name.split("")[0];
  }

const inprogress = ctx.tasks.filter(
    (task) => task.request_status_name === "In Progress"
  ).length;

  const logoutHandler = async () => {
    // await logout(ctx.token);
    ctx.logout();
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.profileInfo}>
          <View style={styles.pic}>
            <Text style={styles.picTxt}>{profileInitial}</Text>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.txt1}>
              Hi, {profile.full_name || profile?.data?.Profile?.full_name}
            </Text>
            <Text style={styles.txt2}>You have {inprogress} In Progress tasks</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign
            name="right"
            size={24}
            color="gray"
            onPress={() => navigation.navigate("Tasks")}
          />
        </View>
      </View>
      <View style={styles.hr}></View>
      <View style={styles.bottom}>
        <View style={styles.icon1}>
          <IconTxtBtn
            icon={<Ionicons name="person-outline" size={24} color="black" />}
            title="Edit my account"
            onPress={() => navigation.navigate("MyAccount")}
          />
        </View>
        <View style={styles.icon2}>
          <IconTxtBtn
            icon={<Feather name="log-in" size={24} color="black" />}
            title="Log out"
            onPress={logoutHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  pic: {
    backgroundColor: "#3571E3",
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  picTxt: {
    color: colors.white,
    fontSize: 38,
  },
  txtContainer: {},
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  txt2: {
    color: "gray",
    fontSize: 11,
  },
  txt1: {
    marginBottom: 6,
    fontSize: 18,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "silver",
    width: "100%",
    marginVertical: 20,
  },
  bottom: {
    width: "100%",
  },
  icon1: {
    marginBottom: 15,
  },
});
