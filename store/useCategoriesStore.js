import {create} from "zustand";

const useCategoriesStore = create(set => ({
    categories: [],
    setCategories: (categories) => set({categories}),
    questions: {},
    addQuestions: (categoryId, questions) => set(state => ({ questions: { ...state.questions, [categoryId]: [questions] } }))
}));
export default useCategoriesStore;