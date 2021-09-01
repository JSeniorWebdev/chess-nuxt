<template>
  <div class="tests">
    <div class="tests__top" :style="{ backgroundColor: currentSerie.color }">
      <div class="tests__guidance">
        <div class="tests__guidance__link" @click="$router.back()">
          <img src="~/assets/icons/left-arrow.svg" />
          <div class="tests__guidance__text">{{ currentSerie.name }}</div>
        </div>
        <div class="tests__level" @click="showLevelModal">{{ levelLabel }}</div>
        <LevelModal
          v-if="isVisibleLevelModal"
          :level="level"
          @close="closeModal"
        />
      </div>
    </div>
    <div class="tests__content">
      <div class="tests__description">
        <img :src="currentCategory.image" />
        <div class="tests__description__content">
          <div class="tests__description__content__title">
            {{ currentCategory.name }}
          </div>
          <DynamicShow :label="currentCategory.description" />
          <div class="tests__description__progress">
            <div class="tests__description__progress__value">
              {{
                getProgress(
                  currentCategory.testsCount,
                  currentCategory.completedTestsCount
                )
              }}%
            </div>
            <div class="progress-container">
              <progress-bar
                size="medium"
                :val="
                  getProgress(
                    currentCategory.testsCount,
                    currentCategory.completedTestsCount
                  )
                "
                :bar-border-radius="5"
                bar-color="#4B79D2"
              ></progress-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="tests__main">
        <TestItem
          v-for="(item, index) in tests"
          :key="'test-' + index"
          :test="item"
        />
      </div>
      <div class="tests__learn">
        <div
          v-for="(item, index) in learn"
          :key="'learn-' + index"
          class="tests__learn__item"
        >
          <InfoCard :card="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import utils from "~/mixins/utils";
import LevelModal from "~/components/tests/LevelModal";
import TestItem from "~/components/tests/TestItem";
import DynamicShow from "~/components/ui/DynamicShow";
import InfoCard from "~/components/ui/InfoCard";

export default {
  name: "Tests",
  components: {
    ProgressBar,
    LevelModal,
    DynamicShow,
    InfoCard,
    TestItem,
  },
  mixins: [utils],
  async asyncData({ app, params, route, store, query }) {
    if (query.serie !== undefined || query.category !== undefined) {
      await store.dispatch("studyList/fetchTests", {
        serieId: Number(query.serie),
        categoryId: Number(query.category),
      });
    }
    if (store.state.studyList.series.length === 0) {
      await store.dispatch("studyList/fetchSeries");
    }
    if (store.state.studyList.categories.length === 0) {
      await store.dispatch("studyList/fetchCategories", query.serie);
    }
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
      play: false,
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
    currentSerie() {
      if (this.$route.query.serie !== undefined) {
        return this.$store.state.studyList.series.find(
          (item) => item.id === Number(this.$route.query.serie)
        );
      }
      return null;
    },
    currentCategory() {
      if (this.$route.query.category !== undefined) {
        return this.$store.state.studyList.categories.find(
          (item) => item.id === Number(this.$route.query.category)
        );
      }
      return null;
    },
    tests() {
      const downloadedTests = this.$store.state.studyList.tests;
      const categoryTests = [];
      for (const test of downloadedTests) {
        categoryTests.push({
          id: test.id,
          number: test.id,
          selected: test.completionStatus,
          title: test.title,
          review: test.bestStarResult,
          question: test.numOfQuestions,
          duration: test.duration,
          difficulty: test.difficulty,
        });
      }
      console.log(categoryTests, "categoryTests");
      return categoryTests;
    },
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
  },
  created() {
    this.play = Object.keys(this.$route.query).includes("play");
    if (this.play) {
      for (let i = 0; i < this.tests.length; i++) {
        const test = this.tests[i];
        if (test.selected !== "completed") {
          this.play = false;
          this.$router.push(`${this.moduleName}/board?test=${test.id}`);
          break;
        }
      }
    }
    if (this.play) {
      for (let i = 0; i < this.tests.length; i++) {
        const test = this.tests[i];
        this.$router.push(`${this.moduleName}/board?test=${test.id}`);
      }
    }
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
@import "/assets/scss/pages/tests/tests";
</style>
