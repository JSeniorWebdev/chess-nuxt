<template>
  <div class="series">
    <div class="series__top">
      <div class="series__guidance">
        <div class="series__guidance__content">
          <div>
            <nuxt-link to="/profile" class="series__guidance__link">
              <img src="~/assets/icons/left-arrow-white.svg" />
              <div class="series__guidance__text">{{ $t("dashboard") }}</div>
            </nuxt-link>
            <div class="series__title">{{ $t("study") }}</div>
          </div>
          <div class="series__level-wrap">
            <div class="series__level" @click="showLevelModal">
              {{ levelLabel }}
            </div>
            <img src="~/assets/icons/search.svg" />
            <LevelModal
              v-if="isVisibleLevelModal"
              :level="level"
              @close="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="series__content">
      <div class="series__content__list">
        <SeriesItem
          v-for="(item, i) in $store.state.studyList.series"
          :key="i"
          :series="item"
        />
      </div>
      <div class="series__content__learn">
        <InfoCard v-for="(item, key) in learn" :key="key" :card="item" />
      </div>
    </div>
  </div>
</template>

<script>
import SeriesItem from "~/components/tests/SeriesItem";
import InfoCard from "~/components/ui/InfoCard";
import LevelModal from "~/components/tests/LevelModal";

export default {
  name: "Series",
  components: {
    SeriesItem,
    InfoCard,
    LevelModal,
  },
  async asyncData({ app, params, store }) {
    await store.dispatch("studyList/fetchSeries");
  },
  data() {
    return {
      learn: [
        {
          icon: "whh_student",
          title: "vyuka",
          subtitle: "mat",
          text: "Secondary line text goes here Secondary line text goes here",
          image: "learn",
        },
        {
          icon: "book",
          title: "sachopedie",
          subtitle: "mat",
          text: "Secondary line text goes here Secondary line text goes here",
          image: "learn",
        },
      ],
      isVisibleLevelModal: false,
      level: "beginner",
    };
  },
  computed: {
    levelLabel() {
      switch (this.level) {
        case "beginner":
          return "Easy";
        case "intermediate":
          return "Medium";
        case "advanced":
          return "Hard";
        default:
          return this.level;
      }
    },
  },
  methods: {
    showLevelModal() {
      this.isVisibleLevelModal = true;
    },
    closeModal(levelNew) {
      this.isVisibleLevelModal = false;
      if (levelNew) this.level = levelNew;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/series";
</style>
