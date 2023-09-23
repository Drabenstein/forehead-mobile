import {View, Text, StyleSheet} from "react-native";

const GameScreen = ({route, navigation}) => {
    const {categoryId} = route.params;

    // const progressBarValue = (millisecondsLeft / 1000 / time) * 100;
    // const progressBarColor =
    //     progressBarValue >= 50
    //         ? "green"
    //         : progressBarValue >= 25
    //             ? "yellow"
    //             : "red";

    // const secondsLeft = Math.ceil(millisecondsLeft / 1000);

    return <View style={styles.screen}><Text>{categoryId}</Text></View>;
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
});

export default GameScreen;