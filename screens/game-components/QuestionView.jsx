import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useCountdown } from "../../hooks/useCountdown";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { useRef } from "react";

const width = Dimensions.get("window").width;

const QuestionView = ({
  question,
  timeSeconds,
  onTimeElapsed,
  onCorrectAnswer,
  onPass,
}) => {
  const hasAlreadyReacted = useRef(false);
  const millisecondsLeft = useCountdown(timeSeconds, onTimeElapsed);
  const longPressGesture = Gesture.LongPress().onStart((e) => {
    if (hasAlreadyReacted.current) {
      return;
    }

    hasAlreadyReacted.current = true;
    if (e.absoluteX > width / 2) {
      runOnJS(onCorrectAnswer)();
    } else {
      runOnJS(onPass)();
    }
  });
  longPressGesture.config.minDurationMs = 800;

  const minutesLeft = Math.floor(millisecondsLeft / 60000);
  const secondsLeft = Math.ceil(
    (millisecondsLeft - minutesLeft * 60000) / 1000,
  );

  return (
    <GestureDetector gesture={longPressGesture}>
      <View style={styles.gameContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        <View style={styles.lowerStatusContainer}>
          <Text style={styles.lowerStatusText}>{question.authorName}</Text>
          <Text style={styles.lowerStatusText}>
            {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
          </Text>
          <Text style={styles.lowerStatusText} adjustsFontSizeToFit={true}>
            {question.helperText}
          </Text>
        </View>
      </View>
    </GestureDetector>
  );
};

export default QuestionView;

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    marginHorizontal: 12,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  lowerStatusContainer: {
    marginBottom: 12,
    marginLeft: 24,
    marginRight: 24,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lowerStatusText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
