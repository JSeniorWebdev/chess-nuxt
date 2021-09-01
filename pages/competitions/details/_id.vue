<template>
  <div class="competitions">
    <div class="competitions__header">
      <div class="competitions__header__content">
        <div
          class="competitions__header__content__dashboard"
          @click="navToCompetitions"
        >
          <img
            class="competitions__header__content__img"
            src="~/assets/icons/left-arrow-white.svg"
          />
          <div>{{ $t("dashboard_competitions") }}</div>
        </div>
      </div>
      <CompetitionTile
        :competition="competition"
        :resized="true"
        :closed="false"
      />
      <div class="tm">
        <CompetitionPlayerTile />
        <CompetitionPlayerTile />
        <CompetitionPlayerTile />
        <CompetitionPlayerTile />
        <CompetitionPlayerTile />
        <CompetitionPlayerTile />
      </div>
      <div class="body__rankings">
        <div class="body__rankings__heading">
          <div class="body__rankings__title">{{ $t("rankings") }}</div>
          <div class="body__rankings__view-all" @click="viewRankings">
            {{ $t("view_all") }}
          </div>
        </div>
        <div class="body__rankings__list">
          <div v-for="(student, index) in ranking.results" :key="student">
            <RankingTile :id="index + 1" :data="student" />
          </div>
        </div>
      </div>

      <div class="body__play-bottom">
        <div class="body__play-bottom__content">
          <div>
            <img class="icon-spacing" src="~/assets/icons/alarm.svg" />{{
              Math.round(competition.time_limit / 60)
            }}
            {{ $t("min") }}
          </div>
          <div>
            <img class="icon-spacing" src="~/assets/icons/heart.svg" />{{
              competition.lives
            }}
            {{ $t("lives") }}
          </div>
          <div>
            <img class="icon-spacing" src="~/assets/icons/re-try.svg" />{{
              competition.attempts
            }}
            {{ $t("attempts") }}
          </div>
        </div>
        <v-btn
          class="primary button__with-icon body__play-bottom__button"
          @click="navToCompetition"
          >{{ $t("play") }}
          <img
            class="button__icon-spacing-right"
            src="~/assets/icons/arrow-right-circle-selected.svg"
        /></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import CompetitionTile from "~/components/ui/CompetitionTile.vue";
import CompetitionPlayerTile from "~/components/ui/CompetitionPlayerTile.vue";
import RankingTile from "~/components/ui/RankingTile.vue";

export default {
  components: {
    CompetitionTile,
    CompetitionPlayerTile,
    RankingTile,
  },
  data() {
    return { competition: {}, ranking: {}, id: 0 };
  },
  async fetch() {
    this.competition = await this.$store.dispatch(
      "statistics/getCompetition",
      this.$route.query.id
    );
    this.ranking = await this.$store.dispatch(
      "statistics/getRanking",
      this.$route.query.id
    );
  },
  methods: {
    viewRankings() {
      this.$router.push(`/ranking/?id=${this.$route.query.id}`);
    },
    navToCompetitions() {
      this.$router.push("/competitions/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/competition-details";
@import "/assets/scss/components/ui/buttons/button";
</style>
