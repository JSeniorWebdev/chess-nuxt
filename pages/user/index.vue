<template>
  <div class="coach">
    <div class="coach__header">
      <div class="coach__header__content">
        <NuxtLink to="/tests/series" class="coach__header__link">
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="coach__header__text">{{ $t("dashboard") }}</div>
        </NuxtLink>
        <div class="coach__header__title">{{ $t("study") }}</div>
      </div>
    </div>
    <Tab :tabs="tabs" @change-tab="changeTab" />
    <div class="coach__tab-container">
      <StudyGroupTabUser v-if="tab === 'study_groups'" />
      <OverviewUser v-if="tab === 'overview'" />
    </div>
  </div>
</template>

<script>
import Tab from "~/components/coach/Tab";
import StudyGroupTabUser from "~/components/coach/StudyGroupTabUser.vue";
import OverviewUser from "~/components/user/OverviewUser.vue";
export default {
  components: {
    Tab,
    StudyGroupTabUser,
    OverviewUser,
  },
  data() {
    return {
      tabs: ["overview", "activities", "study_groups"],
      tab: "overview",
    };
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/coach/coach";
</style>
