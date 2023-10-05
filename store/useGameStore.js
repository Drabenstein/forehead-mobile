import { create } from "zustand";

const useGameStore = create((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  questionsMap: {},
  setQuestionsMap: (questionsMap) => set({ questionsMap }),
  gameAnswers: [],
  markAsCorrectAnswer(question) {
    const gameAnswers = this.gameAnswers || [];
    gameAnswers.push({ question: question, answer: "correct" });
    set({ gameAnswers });
  },
  markAsWrongAnswer(question) {
    const gameAnswers = this.gameAnswers || [];
    gameAnswers.push({ question: question, answer: "wrong" });
    set({ gameAnswers });
  },
  questionHistory: {},
  addQuestionsToHistory: (categoryId, questions) =>
    set((state) => {
      const questionHistory = state.questionHistory;
      const questionsInHistory = questionHistory[categoryId] || [];
      questionsInHistory.unshift(...questions);
      questionHistory[categoryId] = questionsInHistory.slice(0, 50);
      return { questionHistory };
    }),
}));

export default useGameStore;
