<template>
  <div class="main-container">
    <div class="main-container__header">
      <div class="main-container__header__content">
        <div
          class="main-container__header__content__dashboard"
          @click="navToCompetitionDetails"
        >
          <img
            class="main-container__header__content__img"
            src="~/assets/icons/left-arrow-white.svg"
          />
          <div>{{ $t("test_complete") }}</div>
        </div>
        <div class="main-container__header__content__title">
          {{ $t("ranking") }}
        </div>
      </div>
      <div class="main-container__body">
        <div v-for="(student, index) in ranking.results" :key="student">
          <RankingTile :id="index + 1" :data="student" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RankingTile from "~/components/ui/RankingTile.vue";
export default {
  components: {
    RankingTile,
  },
  data() {
    return {
      ranking: {},
    };
  },
  async mounted() {
    this.ranking = await this.$store.dispatch(
      "statistics/getRanking",
      this.$route.query.id
    );
  },
  methods: {
    navToCompetitionDetails() {
      this.$router.push(`/competitions/details/?id=${this.$route.query.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/rank-page";
</style>
