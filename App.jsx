import { SafeAreaView, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "./screens/CategoriesScreen";
import GameLoadingScreen from "./screens/GameLoadingScreen";
import StartGameModal from "./screens/StartGameModal";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{
              title: "Czółko by MD",
            }}
          />
          <Stack.Screen
            name="GameLoading"
            component={GameLoadingScreen}
            options={{
              statusBarStyle: "none",
              presentation: "transparentModal",
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="StartGameModal"
            component={StartGameModal}
            options={{
              statusBarStyle: "none",
              presentation: "containedModal",
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
