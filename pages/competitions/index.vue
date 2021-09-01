<template>
  <div class="competitions">
    <div class="competitions__header">
      <div class="competitions__header__content">
        <div class="competitions__header__content__dashboard">
          <img
            class="competitions__header__content__img"
            src="~/assets/icons/left-arrow-white.svg"
          />
          {{ $t("dashboard") }}
        </div>
        <div class="competitions__header__content__title">
          {{ $t("competitions") }}
        </div>
      </div>
    </div>
    <div class="competitions__main-container">
      <div class="competitions__main-container__tabs">
        <Tab :tabs="tabs" @selected="selected" />
      </div>
      <div
        v-for="competition in competitions.results"
        :key="competition"
        class="competitions__main-container__competition-list"
      >
        <CompetitionTile
          :competition="competition"
          :resized="false"
          :icons="true"
          :closed="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "~/components/coach/Tab";
import CompetitionTile from "~/components/ui/CompetitionTile.vue";

export default {
  components: { Tab, CompetitionTile },
  data() {
    return {
      competitions: {},
      closed: false,
      tabs: ["open", "closed"],
    };
  },
  async mounted() {
    this.competitions = await this.$store.dispatch(
      "statistics/getCompetitions"
    );
    console.log(this.competitions);
  },
  methods: {
    selected(tab) {
      console.log(closed);
      tab === "open" ? (this.closed = false) : (this.closed = true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/competition";
</style>
