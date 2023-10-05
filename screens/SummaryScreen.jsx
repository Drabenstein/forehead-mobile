import {View, Text} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {useEffect} from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const SummaryScreen = () => {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }, [isFocused]);

    return (
        <View>
            <Text>SummaryScreen</Text>
        </View>
    );
};

export default SummaryScreen;