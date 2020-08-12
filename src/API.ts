import { ApiQuestions, Difficulty } from "./Types";
import { shuffleArray } from "./Utils";

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endPoint)).json();
  return data.results.map((questions: ApiQuestions) => {
    return {
      ...questions,
      answers: shuffleArray([
        ...questions.incorrect_answers,
        questions.correct_answer,
      ]),
    };
  });
};
