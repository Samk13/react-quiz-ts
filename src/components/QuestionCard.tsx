import React from "react";
import { AnswerArray } from '../App';
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerArray | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
<div>
    <p>
        question : { questionNr} / { totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}/>
    <div>
        {answers.map(answer => (
            <div key={answer}>
                {/* <span dangerouslySetInnerHTML={{ __html: answer }} /> */}
                {/* <br></br> */}
                <button disabled={!!userAnswer} value={answer} onClick={callback}>{answer}</button>
            </div>
        ))}
    </div>
</div>
);

export default QuestionCard;
