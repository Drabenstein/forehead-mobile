import { Text, StyleSheet, View, Pressable, Image, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

const Card = ({ id, title, imageUrl, onPress, doubleHorizontalMargin }) => {
  
  const outerContainerStyle = {
    ...styles.outerContainer,
    marginRight: doubleHorizontalMargin ? 36 : 12,
  };

  return (
    <View style={outerContainerStyle}>
      <Pressable onPress={onPress} style={styles.pressable} android_ripple={{ color: '#ccc' }}>
        <View style={styles.innerContainer}>
          <Animated.Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" resizeMethod="resize" sharedTransitionTag={id} />
          <Text>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Card;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1/2,
    direction: "row",
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F2EFEA",
    marginHorizontal: 12,
    marginVertical: 8,
  },
  pressable: {
    flex: 1,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
  image: {
    width: '100%',    
    aspectRatio: 4/3,
    zIndex: -1,
    //minHeight: 10,
    //height: width / 2,
    paddingHorizontal: 10,
    marginBottom: 10
  },
});
