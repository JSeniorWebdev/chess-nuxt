export const actions = {
  async getCompetitions(context) {
    return await this.$axios.$get(`/api/chess/competitions/school/`);
  },
  async getTest(context) {
    return await this.$axios.$get(`/api/users/statistics/test/`);
  },
  async getLearning(context) {
    return await this.$axios.$get(`/api/users/statistics/learning/`);
  },
  async getStudy(context) {
    return await this.$axios.$get(`/api/users/statistics/study/`);
  },
  async getRanking(context, compId) {
    return await this.$axios.$get(`/api/chess/competitions/${compId}/ranking/`);
  },
  async getCompetition(context, compId) {
    return await this.$axios.$get(`/api/chess/competitions/${compId}/`);
  },
  async getTests(context) {
    return await this.$axios.$get(`/api/users/statistics/tests/`);
  },
};
