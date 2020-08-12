export type AnswerArray = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  };

  export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

// export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
//     handleChange: (event: string) => string;
//   };

export type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerArray | undefined;
    questionNr: number;
    totalQuestions: number;
  };

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