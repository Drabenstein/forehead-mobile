import { View, StyleSheet } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionView from "./game-components/QuestionView";
import { StackActions } from "@react-navigation/native";
import useGameStore from "../store/useGameStore";
import { Audio } from "expo-av";

const GameScreen = ({ route, navigation }) => {
  const { chosenQuestions } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = useMemo(
    () => chosenQuestions[currentQuestionIndex],
    [currentQuestionIndex],
  );
  const markAsCorrectAnswer = useGameStore(
    (state) => state.markAsCorrectAnswer,
  );
  const markAsWrongAnswer = useGameStore((state) => state.markAsWrongAnswer);

  console.log(currentQuestion);

  const [successSound, setSuccessSound] = useState(null);
  const [timeElapsedSound, setTimeElapsedSound] = useState(null);
  const [passSound, setPassSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/correct.mp3"),
      );
      setSuccessSound(sound);

      const { sound: sound2 } = await Audio.Sound.createAsync(
        require("../assets/time-elapsed.mp3"),
      );
      setTimeElapsedSound(sound2);

      const { sound: sound3 } = await Audio.Sound.createAsync(
        require("../assets/pass.mp3"),
      );
      setPassSound(sound3);
    };

    loadSound();

    return () => {
      successSound?.unloadAsync();
      timeElapsedSound?.unloadAsync();
      passSound?.unloadAsync();
    };
  }, []);

  const moveToNextQuestionOrSummary = useCallback(() => {
    if (currentQuestionIndex === chosenQuestions.length - 1) {
      navigation.dispatch(StackActions.replace("Summary"));
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  }, [currentQuestion, chosenQuestions, navigation]);

  const onCorrectAnswer = useCallback(() => {
    markAsCorrectAnswer(currentQuestion);
    successSound?.playAsync();
    moveToNextQuestionOrSummary();
  }, [markAsCorrectAnswer, currentQuestion, moveToNextQuestionOrSummary]);

  const onWrongAnswer = useCallback(() => {
    markAsWrongAnswer(currentQuestion);
    passSound?.playAsync();
    moveToNextQuestionOrSummary();
  }, [markAsWrongAnswer, currentQuestion, moveToNextQuestionOrSummary]);

  const onTimeElapsed = useCallback(() => {
    markAsWrongAnswer(currentQuestion);
    timeElapsedSound?.playAsync();
    moveToNextQuestionOrSummary();
  }, [markAsWrongAnswer, currentQuestion, moveToNextQuestionOrSummary]);

  return (
    <View style={styles.screen}>
      <QuestionView
        question={currentQuestion}
        timeSeconds={20}
        onCorrectAnswer={onCorrectAnswer}
        onPass={onWrongAnswer}
        onTimeElapsed={onTimeElapsed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 0,
    backgroundColor: "#4ab7ff",
  },
});

export default GameScreen;
