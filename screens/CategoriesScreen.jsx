import React, {useEffect} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {
    View,
    FlatList,
    StyleSheet, ActivityIndicator
} from "react-native";
import Card from "../components/Card";
import {useIsFocused} from "@react-navigation/native";
import {queries} from "../services/queries";
import useGameStore from "../store/useGameStore";

const CategoriesScreen = ({navigation}) => {
    const categories = useGameStore(state => state.categories);
    const {isFetching} = queries.useGetCategoriesWithQuestions();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }, [isFocused]);

    if (isFetching) {
        return <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>;
    }

    const onCategoryPress = (categoryId) => {
        navigation.navigate("StartGameModal", {category: categories.find(x => x.id === categoryId)});
    };

    const isDataLengthUneven = categories.length % 2 === 1;

    return (
        <View style={styles.screen}>
            <FlatList
                key="categories"
                data={categories}
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
                            isDataLengthUneven && itemData.index === categories.length - 1
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
    loadingScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
