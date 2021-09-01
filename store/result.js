import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  results: {
    current: [],
    previous: [],
    best: [],
  },
  answers: [],
});

export const mutations = {
  setResults(state, results) {
    state.results = results;
  },
  setAnswers(state, answers) {
    state.answers = answers;
  },
};

export const actions = {
  async fetchResults(context, testId) {
    const response = await this.$axios.$get(
      `/api/chess/tests/${testId}/results/`
    );
    const answersResponse = await this.$axios.$get(
      `/api/chess/tests/${testId}/answers/`
    );
    context.commit("setResults", convertSnakeToCamel(response));
    context.commit("setAnswers", convertSnakeToCamel(answersResponse.results));
  },
};
