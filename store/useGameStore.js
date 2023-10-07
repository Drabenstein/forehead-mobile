import { create } from "zustand";

const useGameStore = create((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  questionsMap: {},
  setQuestionsMap: (questionsMap) => set({ questionsMap }),
  gameAnswers: [],
  markAsCorrectAnswer(question) {
    set((state) => {
      const gameAnswers = state.gameAnswers || [];
      gameAnswers.push({ question: question, answer: "correct" });
      return { gameAnswers };
    });
  },
  markAsWrongAnswer(question) {
    set((state) => {
      const gameAnswers = state.gameAnswers || [];
      gameAnswers.push({ question: question, answer: "wrong" });
      return { gameAnswers };
    });
  },
  questionHistory: {},
  addQuestionsToHistory: (categoryId, questions) =>
    set((state) => {
      const questionHistory = state.questionHistory;
      const questionsInHistory = questionHistory[categoryId] || [];
      questionsInHistory.unshift(...questions);
      questionHistory[categoryId] = questionsInHistory.slice(0, 100);
      return { questionHistory };
    }),
  restartGame: () => set({ gameAnswers: [] }),
}));

export default useGameStore;
