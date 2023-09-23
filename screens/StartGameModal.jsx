import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
import Animated from "react-native-reanimated";
import CustomButton from "../components/CustomButton";
import {StackActions, useIsFocused} from "@react-navigation/native";
import {useEffect} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {queries} from "../services/queries";

const StartGameModal = ({ route, navigation }) => {
  const { category } = route.params;
  const isFocused = useIsFocused();
  const { data: questions, isFetching } = queries.useGetQuestions(category.id);

  useEffect(() => {
    if (isFocused) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [isFocused]);

  const onBackPress = () => {
    navigation.navigate("Categories");
  };

  const onStartPress = () => {
    navigation.navigate("GameLoading", { categoryId });
    // navigation.dispatch(StackActions.replace("GameLoading", { categoryId }));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.categoryContainer}>
        <Animated.Image
          source={{ uri: category.imageUrl }}
          style={styles.image}
          resizeMode="contain"
          resizeMethod="resize"
          sharedTransitionTag={category.id}
        />
        <Text style={styles.categoryTitle}>{category.name}</Text>
      </View>
      <View style={styles.button}>
        <CustomButton title="Start" color="green" onPress={onStartPress} loading={isFetching} disabled={isFetching} />
      </View>
      <View style={styles.button}>
        <CustomButton title="Back" color="red" onPress={onBackPress} />
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
