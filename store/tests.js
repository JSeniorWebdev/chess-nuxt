import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  testId: -1,
  questions: [],
  iterator: 0,
  answers: [],
  resultId: 0,
});

export const mutations = {
  setResultId(state, resultId) {
    state.resultId = resultId;
  },
  setQuestions(state, { testId, questions }) {
    state.questions = questions;
    state.iterator = 0;
    state.testId = testId;
    state.answers = [];
  },
  nextQuestion(state) {
    if (state.iterator < state.questions.length - 1) {
      state.iterator++;
    }
  },
  previousQuestion(state) {
    if (state.iterator + 1 === state.questions.length) {
      state.answers.pop();
    }
    if (state.iterator > 0) {
      state.iterator--;
    }
  },
  startNewAnswer(state, startTime) {
    if (state.iterator >= state.answers.length) {
      state.answers.push({
        startedAt: startTime,
        finishedAt: null,
        value: "",
        move: "",
      });
    }
  },
  finishAnswer(state, finishTime) {
    state.answers[state.iterator].finishedAt = finishTime;
  },
  setAnswerValue(state, value) {
    state.answers[state.iterator].value = value;
  },
  setAnswerMove(state, move) {
    state.answers[state.iterator].move = move;
  },
  cleanAnswers(state) {
    state.answers = [];
  },
  clean(state) {
    state.answers = [];
    state.iterator = 0;
  },
};

export const actions = {
  async fetchQuestions(context, testId) {
    const response = await this.$axios.$get(
      `/api/chess/tests/${testId}/questions/`
    );
    context.commit("setQuestions", {
      testId,
      questions: convertSnakeToCamel(response).results,
    });
  },
  async startTest(context, { testId, competitionId }) {
    const result = await this.$axios.$post(
      `/api/chess/tests/${testId}/result/`,
      {}
    );
    return result.id;
  },
  async sendAnswer(context, { testId, questionId, payload }) {
    await this.$axios.$post(
      `/api/chess/tests/${testId}/questions/${questionId}/answer/`,
      payload
    );
  },
  async finishTest(context, testId) {
    const response = await this.$axios.$post(
      `/api/chess/tests/${testId}/result/`
    );

    context.commit("setResultId", convertSnakeToCamel(response).id);
  },
};

export const getters = {
  currentQuestion(state) {
    return state.questions[state.iterator];
  },
  currentAnswer(state) {
    return state.answers[state.iterator];
  },
  isLastQuestion(state) {
    return state.questions.length <= state.answers.length;
  },
  isLastQuestionForButton(state) {
    return state.questions.length === state.answers.length;
  },
};
