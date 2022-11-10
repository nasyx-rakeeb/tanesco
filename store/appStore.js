import { createContext, useEffect, useState } from "react";
import { allTickets, updateProfile } from "../services/authServices";
import {
  deleteLocalStoreData,
  getLocalStoreData,
  setLocalStoreData,
} from "../services/secureStore";

export const AppContext = createContext({
  profile: { id: "", full_name: "", phoneNumber: "", email: "" },
  token: null,
  tasks: [],
  isProfileEditing: false,
  setIsProfileEditing: (data) => {},
  setProfileState: (status) => {},
  setUser: (data) => {},
  getUserFromSecureStore: () => {},
  isLoading: false,
  logout: () => {},
  updateUser: (data) => {},
  updateLocalUserData: (data) => {},
  refreshTasks: async () => {},
  isSearchOpen: false,
  setIsSearchOpen: () => {},
});

function AppContextProvider({ children }) {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      await getUserFromSecureStore();

      await setAllTasks();
    }
    getData();
  }, [token]);

  // useEffect(() => {
  //   async function getData() {

  //   }
  //   getData();
  // }, [token]);

  function setProfileState(status) {
    setIsProfileEditing(status);
  }

  async function setAllTasks() {
    let res = [];
    if (token !== null) {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      res = await allTickets(token);
    }
    if (res && typeof res === "object" && res.length > 0) {
      setTasks(res);
      setIsLoading(false);
    } else {
      setTasks([]);
      setIsLoading(false);
      return res;
    }
    setIsLoading(false);
  }

  async function refreshTasks() {
    const res = await allTickets(token);
    if (res && typeof res === "object" && res.length > 0) {
      setTasks(res);
      return res;
    } else {
    }
  }

  async function login(data, token) {
    const localData = JSON.stringify(data.Profile);
    await setLocalStoreData("token", token);
    setToken(token);
    await setLocalStoreData("profile", localData);
    setUser((prev) => ({ ...prev, data }));
  }

  async function updateLocalUserData(data) {
    const localData = JSON.stringify(data);
    await setLocalStoreData("profile", localData);
    setUser((prev) => ({ ...prev, data }));
  }

  async function updateUser(full_name, phone, email, password) {
    const res = await updateProfile(token, full_name, phone, email, password);
    return res;
  }

  async function getUserFromSecureStore() {
    try {
      setIsLoading(true);
      const profileData = await getLocalStoreData("profile");
      const tokenData = await getLocalStoreData("token");
      const data = JSON.parse(profileData);
      setToken(tokenData);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    setToken(null);
    setUser(undefined);
    await deleteLocalStoreData("profile");
    await deleteLocalStoreData("token");
  }

  const value = {
    isProfileEditing: isProfileEditing,
    setProfileState: setProfileState,
    setIsProfileEditing: setIsProfileEditing,
    profile: user,
    login: login,
    updateLocalUserData,
    getUserFromSecureStore: getUserFromSecureStore,
    isLoading: isLoading,
    logout: logout,
    token: token,
    updateUser: updateUser,
    setAllTasks,
    tasks,
    refreshTasks,
    isSearchOpen,
    setIsSearchOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
