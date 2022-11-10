import * as SecureStore from "expo-secure-store";

export async function setLocalStoreData(key, value, options) {
  await SecureStore.setItemAsync(key, value, options);
}

export async function getLocalStoreData(key, options) {
  let result = await SecureStore.getItemAsync(key, options);
  if (result) return result;
  return null;
}

export async function deleteLocalStoreData(key, options) {
  await SecureStore.deleteItemAsync(key, options);
}
