import { View, Text, StyleSheet } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionView from "./game-components/QuestionView";
import { StackActions } from "@react-navigation/native";
import useGameStore from "../store/useGameStore";
import {
  playPassSound,
  playSuccessSound,
  playTimeElapsedSound,
} from "../core/sounds";
import { useCountdown } from "../hooks/useCountdown";

const CorrectAnswerView = ({ moveForward, timeout }) => {
  useCountdown(timeout ?? 2, moveForward);

  useEffect(() => {
    playSuccessSound();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.messageText}>Dobrze!</Text>
    </View>
  );
};

const PassAnswerView = ({ moveForward, timeout }) => {
  useCountdown(timeout ?? 2, moveForward);

  useEffect(() => {
    playPassSound();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.messageText}>Pasuję!</Text>
    </View>
  );
};

const TimeElapsedAnswerView = ({ moveForward, timeout }) => {
  useCountdown(timeout ?? 2, moveForward);

  useEffect(() => {
    playTimeElapsedSound();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.messageText}>Czas minął!</Text>
    </View>
  );
};

const GameScreen = ({ route, navigation }) => {
  const { chosenQuestions } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerState, setAnswerState] = useState("none");
  const currentQuestion = useMemo(
    () => chosenQuestions[currentQuestionIndex],
    [currentQuestionIndex],
  );
  const markAsCorrectAnswer = useGameStore(
    (state) => state.markAsCorrectAnswer,
  );
  const markAsWrongAnswer = useGameStore((state) => state.markAsWrongAnswer);

  const moveToNextQuestionOrSummary = useCallback(
    (currentIndex) => {
      console.log("received", currentIndex);
      if (currentIndex >= chosenQuestions.length - 1) {
        navigation.dispatch(StackActions.replace("Summary"));
        return;
      }

      setCurrentQuestionIndex((index) => index + 1);
    },
    [chosenQuestions, navigation, setCurrentQuestionIndex],
  );
  console.log(
    "GameScreen",
    currentQuestionIndex,
    chosenQuestions[currentQuestionIndex],
  );
  const onCorrectAnswer = useCallback(() => {
    markAsCorrectAnswer(currentQuestion);
    setAnswerState("correct");
  }, [currentQuestion, markAsCorrectAnswer, moveToNextQuestionOrSummary]);

  const onWrongAnswer = useCallback(() => {
    markAsWrongAnswer(currentQuestion);
    setAnswerState("wrong");
  }, [currentQuestion, markAsWrongAnswer, moveToNextQuestionOrSummary]);

  const onTimeElapsed = useCallback(() => {
    markAsWrongAnswer(currentQuestion);
    setAnswerState("timeElapsed");
  }, [currentQuestion, markAsWrongAnswer, moveToNextQuestionOrSummary]);

  const resetAnswerState = useCallback(() => {
    setAnswerState("none");
    moveToNextQuestionOrSummary(currentQuestionIndex);
  }, [setAnswerState, currentQuestionIndex, moveToNextQuestionOrSummary]);

  const getScreenStyle = useCallback((currentAnswerState) => {
    switch (currentAnswerState) {
      case "correct":
        return styles.correctScreen;
      case "wrong":
        return styles.passScreen;
      case "timeElapsed":
        return styles.timeElapsedScreen;
      default:
        return styles.questionScreen;
    }
  }, []);

  return (
    <View style={[styles.screen, getScreenStyle(answerState)]}>
      {answerState === "none" && currentQuestion && (
        <QuestionView
          question={currentQuestion}
          timeSeconds={20}
          onCorrectAnswer={onCorrectAnswer}
          onPass={onWrongAnswer}
          onTimeElapsed={onTimeElapsed}
        />
      )}
      {answerState === "correct" && (
        <CorrectAnswerView moveForward={resetAnswerState} />
      )}
      {answerState === "wrong" && (
        <PassAnswerView moveForward={resetAnswerState} />
      )}
      {answerState === "timeElapsed" && (
        <TimeElapsedAnswerView moveForward={resetAnswerState} />
      )}
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
  },
  questionScreen: {
    backgroundColor: "#4ab7ff",
  },
  passScreen: {
    backgroundColor: "#FF0000", //"#ff4a4a",
  },
  correctScreen: {
    backgroundColor: "#008000", //"#1daf1d",
  },
  timeElapsedScreen: {
    backgroundColor: "#FFD700",
  },
  messageText: {
    fontSize: 78,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: "#fff",
  },
});

export default GameScreen;
