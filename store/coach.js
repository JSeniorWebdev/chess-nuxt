import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const state = () => ({
  requestsForUser: null,
  requestsForCoach: null,
});

export const mutations = {
  setRequestsForUser(state, requestsForUser) {
    state.requestsForUser = requestsForUser;
  },

  setRequestsForCoach(state, requestsForCoach) {
    state.requestsForCoach = requestsForCoach;
  },
};

export const actions = {
  async createGroup(context, payload) {
    return await this.$axios.$post("/api/users/coach/me/group/", payload);
  },

  async getCoach(context, coachId) {
    return await this.$axios.$get(`/api/users/coach/${coachId}/`);
  },

  async getCoaches(context, search) {
    let url = "/api/users/coaches/";
    if (search) {
      url += `?search=${search}`;
    }
    return (await this.$axios.$get(url)).results;
  },

  async editGroup(context, { groupId, payload }) {
    return await this.$axios.$patch(
      `/api/users/coach/me/group/${groupId}/`,
      payload
    );
  },

  async getGroup(context, groupId) {
    return await this.$axios.$get(`/api/users/coach/me/group/${groupId}/`);
  },

  async getRequestsForUser(context) {
    const response = await this.$axios.$get("/api/users/detail/");
    context.commit("setRequestsForUser", convertSnakeToCamel(response));
  },

  async getStudentsInGroup(context, groupId) {
    return await this.$axios.$get(
      `/api/users/coach/me/group/${groupId}/students/`
    );
  },

  async getRequestsForCoach(context) {
    const response = await this.$axios.$get("/api/coach/me/");
    context.commit("setRequestsForCoach", convertSnakeToCamel(response));
  },

  async getStudyGroups(context) {
    return await this.$axios.$get(`api/users/coach/me/groups/`);
  },

  async getCoachRequests(context) {
    return await this.$axios.$get(`api/users/coach/me/requests/`);
  },

  async getStudents(context) {
    return await this.$axios.$get(`api/users/coach/me/students/`);
  },

  async acceptRequest(context, requestId) {
    return await this.$axios.$post(`/api/users/request/${requestId}/accept/`);
  },

  async declineRequest(context, requestId) {
    return await this.$axios.$post(`/api/users/request/${requestId}/decline/`);
  },

  async inviteStudents(context, payload) {
    return await this.$axios.$post(`/api/users/coach/me/invite/`, payload);
  },
};
