import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from "react-native";
import Animated from "react-native-reanimated";
import CustomButton from "../components/CustomButton";
import {useIsFocused} from "@react-navigation/native";
import {useEffect, useState} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import useGameStore from "../store/useGameStore";

const randomizeQuestionsWithNoRepeatsFromAtMaxLastFiveGames = (questionsMap, questionHistory, categoryId) => {
    const historyLimit = Math.min(Math.ceil((questionsMap[categoryId]?.length ?? 0) * 0.25), 50);
    const lastGamesQuestions = questionHistory[categoryId]?.slice(0, historyLimit) ?? [];
    const randomQuestions = [];
    console.log(questionsMap[categoryId].length);
    const questions = questionsMap[categoryId].filter(x => !lastGamesQuestions.includes(x));
    console.log(questions.length);
    while (randomQuestions.length < 10) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];
        randomQuestions.push(randomQuestion);
        delete questions[randomIndex];
    }
    console.log(randomQuestions);
    return randomQuestions;
};

const StartGameModal = ({route, navigation}) => {
    const {category} = route.params;
    const isFocused = useIsFocused();
    const questionsMap = useGameStore(state => state.questionsMap);
    const questionHistory = useGameStore(state => state.questionHistory);
    const addQuestionsToHistory = useGameStore(state => state.addQuestionsToHistory);
    const [chosenQuestions, setChosenQuestions] = useState([]);

    useEffect(() => {
        const randomQuestions = randomizeQuestionsWithNoRepeatsFromAtMaxLastFiveGames(questionsMap, questionHistory, category.id);
        setChosenQuestions(randomQuestions);
    }, [category]);

    useEffect(() => {
        if (isFocused) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }, [isFocused]);

    const onBackPress = () => {
        navigation.navigate("Categories");
    };

    const onStartPress = () => {
        addQuestionsToHistory(chosenQuestions);
        navigation.navigate("GameLoading", {chosenQuestions});
        // navigation.dispatch(StackActions.replace("GameLoading", { categoryId }));
    };

    return (
        <View style={styles.screen}>
            <View style={styles.categoryContainer}>
                <Animated.Image
                    source={{uri: category.imageUrl}}
                    style={styles.image}
                    resizeMode="contain"
                    resizeMethod="resize"
                    sharedTransitionTag={category.id}
                />
                <Text style={styles.categoryTitle}>{category.name}</Text>
            </View>
            <View style={styles.button}>
                <CustomButton title="Start" color="green" onPress={onStartPress} loading={chosenQuestions?.length === 0}
                              disabled={chosenQuestions?.length === 0}/>
            </View>
            <View style={styles.button}>
                <CustomButton title="Back" color="red" onPress={onBackPress}/>
            </View>
        </View>
    );
};

export default StartGameModal;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 12,
        marginTop: 12,
        marginBottom: 20,
    },
    categoryContainer: {
        flex: 4,
        alignContent: "center",
        alignItems: "center",
        marginHorizontal: 24,
        paddingHorizontal: 12,
    },
    image: {
        flex: 1 / 2,
        aspectRatio: 4 / 3,
        maxWidth: width,
    },
    categoryTitle: {
        marginTop: 12,
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        marginVertical: 5,
        width: "100%",
        justifyContent: "center",
        marginHorizontal: 12,
    },
});
