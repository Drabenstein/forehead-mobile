import { View, Text, Pressable, Dimensions, StyleSheet, Button } from "react-native";
import { CATEGORIES } from "./CategoriesScreen";
import Animated from "react-native-reanimated";

const StartGameModal = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const data = CATEGORIES.find((category) => category.id === categoryId);

  return (
    <View style={styles.screen}>
      <View style={styles.categoryContainer}>
        <Animated.Image
          source={{ uri: data.imageUrl }}
          style={styles.image}
          resizeMode="center"
          resizeMethod="scale"
          sharedTransitionTag={data.id}
        />
        <Text style={styles.categoryTitle}>{data.name}</Text>
      </View>
      <View style={styles.button}>
        <Button title="Start" color="green" />
      </View>
      <View style={styles.button}>
        <Button title="Back" color="red" />
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
    marginTop: 12
  },
  categoryContainer: {
    flex: 4,
    alignContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    paddingHorizontal: 12
  },
  image: {
    flex: 1 / 2,
    aspectRatio: 4 / 3,
    maxWidth: width
  },
  categoryTitle: {
    marginTop: 12,
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
    width: "100%",
    justifyContent: "center",
    marginHorizontal: 12,
  },
});
