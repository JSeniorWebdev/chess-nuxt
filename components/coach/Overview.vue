<template>
  <div class="overview">
    <div v-if="requests.count" class="overview__item">
      <div class="overview__header">
        <div class="overview__title">
          {{ $t("new_requests") }} ({{ requests.count }})
        </div>
      </div>
      <div class="overview__content">
        <div v-for="request in requests.results" :key="request">
          <RequestItem :request="request.user" />
        </div>
      </div>
    </div>
    <div class="overview__item">
      <div class="overview__header">
        <div class="overview__title">
          {{ $t("study_groups") }}
          <span v-if="study_groups.count">({{ study_groups.count }})</span>
        </div>
        <div class="overview__link" @click="viewAllGroups">
          {{ $t("view_all") }}
        </div>
      </div>
      <div
        v-if="study_groups.count"
        class="overview__content overview__study-group"
      >
        <div v-for="group in study_groups.results" :key="group">
          <StudyGroup :group="group" />
        </div>
      </div>
      <div v-else class="overview__empty-container">
        <EmptyGroups />
      </div>
    </div>
    <div class="overview__item">
      <div class="overview__header">
        <div class="overview__title">
          {{ $t("students") }}
          <span v-if="students.length">({{ students.length }})</span>
        </div>
        <div
          v-if="students.length"
          class="overview__link"
          @click="viewAllStudents"
        >
          {{ $t("view_all") }}
        </div>
      </div>
      <div v-if="students.length" class="overview__content">
        <div v-for="student in students.results" :key="student">
          <UserInfo :user="student" />
        </div>
      </div>
      <div v-else class="overview__empty-container">
        <EmptyStudents />
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "~/components/coach/UserInfo";
import StudyGroup from "~/components/coach/StudyGroup";
import EmptyGroups from "~/components/coach/EmptyGroups";
import EmptyStudents from "~/components/coach/EmptyStudents";
import RequestItem from "~/components/coach/RequestItem";

export default {
  components: {
    UserInfo,
    StudyGroup,
    EmptyGroups,
    EmptyStudents,
    RequestItem,
  },
  data() {
    return {
      requests: {},
      study_groups: {},
      students: {},
    };
  },
  async mounted() {
    this.study_groups = await this.$store.dispatch("coach/getStudyGroups");
    this.students = await this.$store.dispatch("coach/getStudents");
    this.requests = await this.$store.dispatch("coach/getCoachRequests");
  },
  methods: {
    viewAllGroups() {
      this.$emit("swap", "study_groups");
    },
    viewAllStudents() {
      this.$emit("swap", "students");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/overview";
</style>
