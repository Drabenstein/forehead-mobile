import {create} from "zustand";

const useGameStore = create(set => ({
    categories: [],
    setCategories: (categories) => set({categories}),
    questionsMap: {},
    setQuestionsMap: (questionsMap) => set({questionsMap}),
    questionHistory: {},
    addQuestionsToHistory: (categoryId, questions) => set(state => {
        const questionHistory = state.questionHistory;
        questionHistory[categoryId] = [...questions, ...questionHistory[categoryId] || []].slice(0, 50);
        return {questionHistory};
    })
}));

export default useGameStore;