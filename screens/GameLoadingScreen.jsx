import { Text } from "react-native";
import { useCountdown } from "../hooks/useCountdown"

const GameLoadingScreen = ({ navigation }) => {
    const countDown = useCountdown(3);
    
    return <Text>countDown</Text>;
}

export default GameLoadingScreen;