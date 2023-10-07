import { View, Text, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import useGameStore from "../store/useGameStore";
import Animated, {
  Layout,
  SlideInDown,
  useAnimatedStyle,
} from "react-native-reanimated";
import CustomButton from "../components/CustomButton";

const SummaryScreen = () => {
  const answers = useGameStore((state) => state.gameAnswers);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [answerData, setAnswerData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [isFocused]);

  useEffect(() => {
    const timeouts = answers.map((answer, index) => {
      return setTimeout(
        () => setAnswerData((prev) => [...prev, answer]),
        800 * index + 100,
      );
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Podsumowanie</Text>
      <Animated.FlatList
        style={styles.answerList}
        data={answerData}
        keyExtractor={(item) => item.question.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: answer, index }) => (
          <Animated.View
            key={answer.question.id}
            entering={SlideInDown.duration(1000)}
          >
            <Text
              style={[
                styles.questionText,
                answer.answer === "correct"
                  ? styles.goodAnswer
                  : styles.badAnswer,
              ]}
            >
              {answer.question.text}
            </Text>
          </Animated.View>
        )}
      />
      <View style={styles.backButton}>
        <CustomButton title={"Powrót"} color={"green"} onPress={onBackPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginBottom: 24,
  },
  title: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 42,
    marginTop: 24,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#dbd41a",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  questionText: {
    fontSize: 28,
    marginBottom: 12,
    color: "rgba(85,85,85,0.6)",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  goodAnswer: {
    color: "green",
  },
  badAnswer: {
    color: "red",
  },
  answerList: {
    flex: 1,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  backButton: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
});

export default SummaryScreen;
