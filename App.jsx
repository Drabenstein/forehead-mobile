import {StyleSheet, SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CategoriesScreen from "./screens/CategoriesScreen";
import GameLoadingScreen from "./screens/GameLoadingScreen";
import StartGameModal from "./screens/StartGameModal";
import GameScreen from "./screens/GameScreen";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import UpdateDataButton from "./components/UpdateDataButton";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient()

export default function App() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Group>
                            <Stack.Screen
                                name="Categories"
                                component={CategoriesScreen}
                                options={{
                                    title: "Czółko by MD",
                                    headerRight: () => (
                                        <UpdateDataButton/>
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name="GameLoading"
                                component={GameLoadingScreen}
                                options={{
                                    statusBarStyle: "none",
                                    statusBarHidden: true,
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name="Game"
                                component={GameScreen}
                                options={{
                                    statusBarStyle: "none",
                                    statusBarHidden: true,
                                    headerShown: false
                                }}
                            />
                        </Stack.Group>
                        <Stack.Group screenOptions={{presentation: "modal"}}>
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
