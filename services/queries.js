import {useQuery} from "@tanstack/react-query";
import {fetchCategories} from "./api";
import useGameStore from "../store/useGameStore";
import {updateData} from "../store/storage";
import {Category} from "../models/Category";
import {Question} from "../models/Question";

const mapResponse = (data) => {
    const categories = data.map(x => (new Category(x.id, x.name, x.imageUrl)));
    const questionsMap = {};
    for (const category of data) {
        questionsMap[category.id] = category.questions.map(x => (new Question(x.id, x.text, x.helperText, x.authorName)));
    }
    return {categories, questionsMap};
}

export const queries = {
    useGetCategoriesWithQuestions: () => {
        const setCategories = useGameStore(state => state.setCategories);
        const setQuestionsMap = useGameStore(state => state.setQuestionsMap);
        return useQuery({
            queryKey: ['categories'],
            queryFn: () => {
                setCategories([]);
                return fetchCategories();
            },
            onSuccess: async (data) => {
                const {categories, questionsMap} = mapResponse(data);
                await updateData(data);
                setCategories(categories);
                setQuestionsMap(questionsMap);
            },
            onError: (error) => {
              console.log('error', error);
              alert(`on error: ${error}`);
            },
            enabled: false
        });
    }
};