import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "../hooks/useCountdown";
import { StackActions, useIsFocused } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import useGameStore from "../store/useGameStore";

const GameLoadingScreen = ({ route, navigation }) => {
  const restartGame = useGameStore((state) => state.restartGame);
  const { chosenQuestions } = route.params;

  const onElapsed = () => {
    navigation.dispatch(StackActions.replace("Game", { chosenQuestions }));
  };

  const millisecondsLeft = useCountdown(5, onElapsed);
  const isFocused = useIsFocused();

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    if (isFocused) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
  }, [isFocused]);

  const secondsLeft = Math.ceil(millisecondsLeft / 1000);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{secondsLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
    backgroundColor: "#4ab7ff",
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default GameLoadingScreen;
