import {useQuery} from "@tanstack/react-query";
import {fetchCategories, fetchQuestionsForCategory} from "./api";
import useCategoriesStore from "../store/useCategoriesStore";

export const queries = {
    useGetCategories: () => {
        const setCategories = useCategoriesStore(state => state.setCategories);
        return useQuery({
            queryKey: ['categories'],
            queryFn: () => {
                setCategories([]);
                return fetchCategories();
            },
            onSuccess: async (data) => {
                setCategories(data);
            }
        });
    },
    useGetQuestions: (categoryId) => {
        const addQuestions = useCategoriesStore(state => state.addQuestions);
        return useQuery({
            queryKey: ['questions', categoryId],
            queryFn: () => fetchQuestionsForCategory(categoryId),
            onSuccess: (data) => {
                addQuestions(categoryId, data);
            }
        });
    }
};