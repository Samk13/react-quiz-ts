 import { shuffleArray } from './Utils';

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export type ApiQuestions = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = ApiQuestions & {
    answers: string[]
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endPoint)).json();
     return data.results.map((questions: ApiQuestions) => {
         return {
             ...questions,
             answers: shuffleArray([
                 ...questions.incorrect_answers,
                 questions.correct_answer
             ])
         }
     })
}


