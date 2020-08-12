import {
  Box,
  FormControlLabel,
  FormGroup,
  Paper,
  Switch
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { Fragment, useState } from "react";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
import NavBar from "./components/NavBar";
import QuestionCard from "./components/QuestionCard";



type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  handleChange: (event: string) => string;
};


export type AnswerArray = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};


const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerArray[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // End State

  // fetch API data
  const fetchApi = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  };
  // end fetch API data

  // Check answers
  const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      // user answer
      const answer = e.currentTarget.value
      // validate answer
      const isAnswerCorrect = questions[questionNumber].correct_answer === answer;
      // add to score if correct
      if (isAnswerCorrect) {
        setScore((previousScore)=> previousScore + 1 )
      }
      // store answers
      const AnswerArray = {
      question: questions[questionNumber].question,
      answer,
      correct: isAnswerCorrect,
      correctAnswer: questions[questionNumber].correct_answer
      };
      setUserAnswers((previousAnswers) =>[...previousAnswers, AnswerArray])
    }
  };
  // End Check answers

  // Next Question
  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if ( nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion)
    }

  };
  // End Next Question

  // Material UI ==================
  const [darkMode, setDarkMode] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
  // End Material UI ============

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Paper style={{ height: "100vh" }}>
          <Box display="flex" m={5} p={1} bgcolor="background.paper">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleChange}
                    aria-label="login switch"
                  />
                }
                label={darkMode ? "Dark" : "Light"}
              />
            </FormGroup>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            m={1}
            p={10}
            bgcolor="background.paper"
          >
            {!gameOver && <Paper>Score: {score}</Paper>}
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <button onClick={fetchApi}>Start</button>
            ) : null}
            {loading && <p>Loading questions ...</p>}
            {!loading && !gameOver && questions.length > 0 && <QuestionCard
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            callback={checkAnswers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined }
            questionNr={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            />}
            {!gameOver &&
             !loading &&
             userAnswers.length === questionNumber + 1 &&
              questionNumber !== TOTAL_QUESTIONS - 1 &&
              <button onClick={nextQuestion}>Next question</button>
            }
          </Box>
        </Paper>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
