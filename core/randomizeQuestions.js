const randomizeQuestionsWithNoRepeatsFromHistory = (
  questionsMap,
  questionHistory,
  categoryId,
) => {
  if (questionsMap[categoryId]?.length < 10) {
    return [];
  }

  const historyLimit = questionHistory[categoryId]?.length - 20 ?? 0;
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
