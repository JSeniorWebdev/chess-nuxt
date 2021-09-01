<template>
  <div class="coach">
    <div class="coach__header">
      <div class="coach__header__content">
        <NuxtLink to="/tests/series" class="coach__header__link">
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="coach__header__text">{{ $t("dashboard") }}</div>
        </NuxtLink>
        <div class="coach__header__title">{{ $t("coach") }}</div>
      </div>
    </div>
    <Tab :tabs="tabs" @change-tab="changeTab" />
    <div class="coach__tab-container">
      <Overview v-if="tab === 'overview'" @swap="changeTab" />
      <StudyGroupTab v-if="tab === 'study_groups'" />
      <Students v-if="tab === 'students'" />
    </div>
  </div>
</template>

<script>
import Tab from "~/components/coach/Tab";
import Overview from "~/components/coach/Overview";
import StudyGroupTab from "~/components/coach/StudyGroupTab";
import Students from "~/components/coach/Students";

export default {
  name: "Coach",
  components: {
    Tab,
    Overview,
    StudyGroupTab,
    Students,
  },
  // TODO commented out because we need to fix this 404 error
  // async asyncData({ app, params, route, store, query }) {
  //   await store.dispatch("coach/getRequestsForUser");
  //   console.log(store.state.coach.requestsForUser);

  //   await store.dispatch("coach/getRequestsForCoach");
  //   console.log(store.state.coach.requestsForCoach);
  // },
  data() {
    return {
      tabs: ["overview", "study_groups", "students"],
      tab: "overview",
    };
  },
  mounted() {
    if (this.$auth.user.role !== "coach") {
      this.$router.push(`/${this.$auth.user.role}/`);
    }
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/pages/coach/coach";
</style>
