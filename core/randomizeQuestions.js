const randomizeQuestionsWithNoRepeatsFromHistory = (
  questionsMap,
  questionHistory,
  categoryId,
) => {
  const historyLimit = Math.min(
    Math.ceil((questionsMap[categoryId]?.length ?? 0) * 0.4),
    200,
  );
  const lastGamesQuestions =
    questionHistory[categoryId]?.slice(0, historyLimit) ?? [];
  const randomQuestions = [];
  const questions = questionsMap[categoryId].filter(
    (x) => !lastGamesQuestions.includes(x),
  );
  while (randomQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    randomQuestions.push(randomQuestion);
    questions.splice(randomIndex, 1);
  }
  return randomQuestions;
};

export { randomizeQuestionsWithNoRepeatsFromHistory };
