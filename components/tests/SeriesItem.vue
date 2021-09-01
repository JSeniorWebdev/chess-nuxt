<template>
  <div class="series-item">
    <nuxt-link
      class="series-item__content"
      :style="{ 'background-color': series.color }"
      :to="`/${moduleName}/categories?serie=${series.id}`"
    >
      <img :src="series.image" />
      <div class="series-item__title">{{ series.name }}</div>
      <div class="series-item__progress">
        <div class="series-item__progress__label">
          {{ getProgress(series.testsCount, series.completedTestsCount) }}%
        </div>
        <div class="series-item__progress__progressbar">
          <progress-bar
            size="medium"
            :val="getProgress(series.testsCount, series.completedTestsCount)"
            :bar-border-radius="5"
            bar-color="#4B79D2"
          ></progress-bar>
        </div>
      </div>
    </nuxt-link>
    <div class="series-item__action" @click="random">{{ $t("play") }}</div>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import utils from "~/mixins/utils";

export default {
  name: "SeriesItem",
  components: {
    ProgressBar,
  },
  mixins: [utils],
  props: {
    series: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
  },
  methods: {
    async random() {
      let selected = null;
      await this.$store.dispatch("testsList/fetchCategories", this.series.id);
      const max = this.$store.state.testsList.categories.length;
      for (let i = 0; i < max; i++) {
        const category = this.$store.state.testsList.categories[i];
        if (category.percentage < 100) {
          selected = category;
          break;
        }
      }
      if (selected === null) {
        const index = Math.floor(Math.random() * max);
        selected = this.$store.state.testsList.categories[index];
      }

      await this.$store.dispatch("testsList/fetchTests", {
        serieId: this.series.id,
        categoryId: selected.id,
      });

      const maxTest = this.$store.state.testsList.tests.length;
      let selectedTest = null;
      for (let i = 0; i < maxTest; i++) {
        const test = this.$store.state.testsList.tests[i];
        console.log("test", test);
        if (test.completionStatus !== "completed") {
          selectedTest = test;
          break;
        }
      }
      if (selectedTest === null) {
        const index = Math.floor(Math.random() * maxTest);
        selectedTest = this.$store.state.testsList.tests[index];
      }
      this.$router.push(`/tests/board?test=${selectedTest.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/series-item";
</style>
