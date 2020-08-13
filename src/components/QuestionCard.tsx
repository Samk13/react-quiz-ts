import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Props } from '../Types';

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
    {/* <p dangerouslySetInnerHTML={{ __html: question }}/> */}
    <Typography variant="h3">
        {question}
    </Typography>
    <div>
        {answers.map(answer => (
            <div key={answer}>
                <Button fullWidth disabled={!!userAnswer} value={answer} onClick={callback}>
                    <Typography variant="h4">
                        {answer}
                    </Typography>
                </Button>
            </div>
        ))}
    </div>
</div>
);

export default QuestionCard;
