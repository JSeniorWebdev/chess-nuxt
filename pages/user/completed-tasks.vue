<template>
  <div class="completed-tasks">
    <div class="completed-tasks__header">
      <div class="completed-tasks__header__content">
        <div class="completed-tasks__header__top">
          <NuxtLink to="/tests/series" class="completed-tasks__header__link">
            <img src="~/assets/icons/left-arrow-white.svg" />
            <div class="completed-tasks__header__text">
              {{ $t("dashboard") }}
            </div>
          </NuxtLink>
          <span class="completed-tasks__header__top__point">•</span>
          <NuxtLink to="/user" class="completed-tasks__header__link">
            <div class="completed-tasks__header__text">{{ $t("study") }}</div>
          </NuxtLink>
        </div>
        <div class="completed-tasks__header__title">
          {{ $t("completed_tasks") }}
        </div>
      </div>
    </div>
    <div class="completed-tasks__content">
      <div class="completed-tasks__content__top">
        <div class="completed-tasks__content__title">
          {{ $t("past_activities") }}
        </div>
        <Sort :direction="direction" @sort="sort" />
      </div>
      <div class="completed-tasks__content__main">
        <PreviousTask :is-test="true" />
        <PreviousTask :is-test="false" />
      </div>
    </div>
  </div>
</template>

<script>
import PreviousTask from "~/components/ui/PreviousTask";
import Sort from "~/components/ui/Sort";

export default {
  name: "CompletedTasks",
  components: {
    PreviousTask,
    Sort,
  },
  data() {
    return {
      direction: "asc",
    };
  },
  methods: {
    sort() {
      this.direction = this.direction === "asc" ? "desc" : "asc";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/user/completed-tasks";
</style>
