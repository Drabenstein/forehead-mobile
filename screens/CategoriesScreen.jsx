import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import Card from "../components/Card";
import { useIsFocused } from "@react-navigation/native";

export const CATEGORIES = [
  {
    id: "1",
    name: "Zanuć",
    imageUrl:
      "https://strategiczni.pl/wp-content/uploads/2020/10/robinson-recalde-st0n-ie8oko-unsplash-2.jpg",
  },
  {
    id: "2",
    name: "Znane postacie",
    imageUrl:
      "https://strategiczni.pl/wp-content/uploads/2020/10/robinson-recalde-st0n-ie8oko-unsplash-2.jpg",
  },
  {
    id: "3",
    name: "Filmy",
    imageUrl:
      "https://strategiczni.pl/wp-content/uploads/2020/10/robinson-recalde-st0n-ie8oko-unsplash-2.jpg",
  },
  {
    id: "4",
    name: "Filmy",
    imageUrl:
      "https://strategiczni.pl/wp-content/uploads/2020/10/robinson-recalde-st0n-ie8oko-unsplash-2.jpg",
  },
  {
    id: "5",
    name: "Filmy",
    imageUrl:
      "https://strategiczni.pl/wp-content/uploads/2020/10/robinson-recalde-st0n-ie8oko-unsplash-2.jpg",
  },
  {
    id: "6",
    name: "Filmy",
    imageUrl:
      "https://strategiczni.pl/wp-content/uploads/2020/10/robinson-recalde-st0n-ie8oko-unsplash-2.jpg",
  },
];

const CategoriesScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [isFocused]);

  const onCategoryPress = (categoryId) => {
    // setSelectedCategory(CATEGORIES.find((c) => c.id === categoryId));
    navigation.navigate("StartGameModal", { categoryId: categoryId });
  };

  const data = CATEGORIES;
  const isDataLengthUneven = data.length % 2 === 1;

  return (
    <View style={styles.screen}>
      <FlatList
        key="test"
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        Item
        renderItem={(itemData) => (
          <Card
            id={itemData.item.id}
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.name}
            onPress={onCategoryPress.bind(this, itemData.item.id)}
            doubleHorizontalMargin={
              isDataLengthUneven && itemData.index === data.length - 1
            }
          />
        )}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 10,
  },
});
