export const actions = {
  async hireCoach(context, coachId) {
    return await this.$axios.$post(`/api/users/coach/${coachId}/request/`);
  },
  async getStudents(context) {
    return (await this.$axios.$get(`/api/users/students/`)).results;
  },
  async getUserInformation(context) {
    return await this.$axios.$get(`/api/users/detail/`);
  },
  async sendCoachMessage(context, { id, message }) {
    if (!message) {
      message = ``;
    }
    return await this.$axios.$post(`/api/users/coach/${id}/message/`, {
      message,
    });
  },
};
