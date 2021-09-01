import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  series: [],
  categories: [],
  tests: [],
});

export const mutations = {
  setSeries(state, series) {
    state.series = series.sort((a, b) => a.id - b.id);
  },
  setCategories(state, categories) {
    state.categories = categories.sort((a, b) => a.id - b.id);
  },
  setTests(state, tests) {
    state.tests = tests.sort((a, b) => a.id - b.id);
  },
};

export const actions = {
  async fetchSeries(context) {
    const response = await this.$axios.$get(`/api/chess/tests/series/`);
    context.commit("setSeries", convertSnakeToCamel(response).results);
  },
  async fetchCategories(context, serieId) {
    const response = await this.$axios.$get(
      `/api/chess/tests/series/${serieId}/categories/`
    );
    context.commit("setCategories", convertSnakeToCamel(response).results);
  },
  async fetchTests(context, { serieId, categoryId }) {
    const response = await this.$axios.$get(
      `/api/chess/tests/series/${serieId}/categories/${categoryId}/`
    );
    context.commit("setTests", convertSnakeToCamel(response).results);
  },
  async fetchTestDetail(context, testId) {
    const response = await this.$axios.$get(
      `/api/chess/tests/${testId}/detail/`
    );
    return response;
  },
};

export const getters = {
  getTests(state) {
    return state.tests;
  },
};
