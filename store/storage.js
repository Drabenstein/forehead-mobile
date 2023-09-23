import AsyncStorage from '@react-native-async-storage/async-storage';
import {Category} from "../models/Category";
import {Question} from "../models/Question";

export const updateData = async (categoriesWithQuestions) => {
    const categories = categoriesWithQuestions.map(x => new Category(x.id, x.name, x.imageUrl));
    try {
        const existingCategoriesJson = await AsyncStorage.getItem('categories');
        if (existingCategoriesJson !== null) {
            const existingCategories = JSON.parse(existingCategoriesJson);
            const questionsKeys = existingCategories?.map(x => `questions-${x.id}`);
            await AsyncStorage.multiRemove(questionsKeys);
        }
        const dataToSet = [['categories', JSON.stringify(categories)]];
        for (const category of categoriesWithQuestions) {
            const questions = category.questions.map(x => new Question(x.id, x.text, x.helperText, x.authorName));
            dataToSet.push([`questions-${category.id}`, JSON.stringify(questions)]);
        }
        await AsyncStorage.multiSet(dataToSet);
    } catch (e) {
        alert('storage ' + e);
    }
};

export const getCategories = async () => {
    try {
        const categories = await AsyncStorage.getItem('categories');
        return categories != null ? JSON.parse(categories) : [];
    } catch (e) {
        alert(e);
    }
};

export const getQuestionMap = async (categoryIds) => {
    const keys = categoryIds.map(x => `questions-${x}`);
    const questions = await AsyncStorage.multiGet(keys);
    const questionsMap = {};
    for (const question of questions) {
        const categoryId = question[0].replace('questions-', '');
        questionsMap[categoryId] = JSON.parse(question[1]);
    }
    return questionsMap;
};