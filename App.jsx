import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "./screens/CategoriesScreen";
import GameLoadingScreen from "./screens/GameLoadingScreen";
import StartGameModal from "./screens/StartGameModal";
import GameScreen from "./screens/GameScreen";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateDataButton from "./components/UpdateDataButton";
import useGameStore from "./store/useGameStore";
import { getCategories, getQuestionMap } from "./store/storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SummaryScreen from "./screens/SummaryScreen";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  const setCategories = useGameStore((state) => state.setCategories);
  const setQuestionsMap = useGameStore((state) => state.setQuestionsMap);

  useEffect(() => {
    const initialize = async () => {
      const categories = await getCategories();
      const questionMap = await getQuestionMap(categories.map((x) => x.id));
      setCategories(categories);
      setQuestionsMap(questionMap);
    };

    initialize();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Group>
                <Stack.Screen
                  name="Categories"
                  component={CategoriesScreen}
                  options={{
                    title: "Czółko by MD",
                    headerRight: () => <UpdateDataButton />,
                    statusBarStyle: "none",
                    statusBarHidden: true,
                  }}
                />
                <Stack.Screen
                  name="GameLoading"
                  component={GameLoadingScreen}
                  options={{
                    statusBarStyle: "none",
                    statusBarHidden: true,
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Game"
                  component={GameScreen}
                  options={{
                    statusBarStyle: "none",
                    statusBarHidden: true,
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name={"Summary"}
                  component={SummaryScreen}
                  options={{
                    statusBarStyle: "none",
                    statusBarHidden: true,
                    headerShown: false,
                  }}
                />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                  name="StartGameModal"
                  component={StartGameModal}
                  options={{
                    statusBarStyle: "none",
                    statusBarHidden: true,
                    presentation: "containedModal",
                    headerShown: false,
                  }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaView>
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
