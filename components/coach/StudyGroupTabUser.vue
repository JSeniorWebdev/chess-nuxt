<template>
  <div v-if="user_data" class="study-group-tab">
    <div class="study-group-tab__button">
      <Button
        :label="$t('hire_new_coach')"
        type="tertiary"
        size="large"
        position="left"
        width="208px"
        height="40px"
        padding-top="10px"
        icon="add"
        @click="toForm"
      />
    </div>
    <div class="study-group-tab__title">
      {{
        $tc("new_coach_invitations", requests.length, {
          count: requests.length,
        })
      }}
    </div>
    <div
      v-for="request in requests"
      :key="request"
      class="study-group-tab__coach-requests"
    >
      <CoachRequests :request="request" @acceptCoach="addCoach" />
    </div>
    <div class="study-group-tab__header">
      <div v-if="user_data.groups.length" class="study-group-tab__title">
        {{
          $tc("my_study_groups", user_data.groups.length, {
            count: user_data.groups.length,
          })
        }}
      </div>
    </div>
    <div v-if="user_data.groups.length" class="study-group-tab__content">
      <StudyGroup
        v-for="(group, i) in user_data.groups"
        :key="`group_${i}`"
        :group="group"
      />
    </div>
    <div v-else class="study-group-tab__empty-container">
      <EmptyGroups />
    </div>
    <div
      v-if="user_data.coaches.length"
      class="study-group-tab__title view-margin-bottom-24"
    >
      {{ $tc("my_coaches") }}
      <div v-for="coach in user_data.coaches" :key="coach">
        <CoachInfo :is-white="true" :coach="coach" />
      </div>
    </div>
    <div
      v-if="!user_data.coaches.length"
      class="study-group-tab__empty-container"
    >
      <EmptyCoaches />
    </div>
  </div>
  <div v-else class="view-circular-progress-bar">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";
import StudyGroup from "~/components/coach/StudyGroup";
import EmptyCoaches from "~/components/coach/EmptyCoaches";
import CoachRequests from "~/components/user/CoachRequest.vue";
import CoachInfo from "~/components/coach/CoachInfo";

export default {
  name: "StudyGroupTab",
  components: {
    Button,
    StudyGroup,
    EmptyCoaches,
    CoachInfo,
    CoachRequests,
  },
  data() {
    return {
      user_data: null,
      requests: null,
    };
  },
  async fetch() {
    this.user_data = await this.$store.dispatch("user/getUserInformation");
    this.requests = this.user_data.requests;
  },
  methods: {
    toForm() {
      this.$router.push(`/user/hire-a-coach/`);
    },
    addCoach(coach) {
      this.coaches.push(coach);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/study-group-tab";
</style>
