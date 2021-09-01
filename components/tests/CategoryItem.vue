<template>
  <div class="category-item">
    <div class="category-item__content" @click="open">
      <img :src="category.image" />
      <div class="category-item__text">
        <div class="category-item__title-wrap">
          <div class="category-item__title">{{ category.name }}</div>
          <div class="category-item__number">
            {{ category.testsCount }} tests
          </div>
        </div>
        <div class="category-item__progress">
          <div class="category-item__progress__label">
            {{
              getProgress(category.testsCount, category.completedTestsCount)
            }}%
          </div>
          <div class="category-item__progress__progressbar">
            <progress-bar
              size="medium"
              :val="
                getProgress(category.testsCount, category.completedTestsCount)
              "
              :bar-border-radius="5"
              bar-color="#4B79D2"
            ></progress-bar>
          </div>
        </div>
      </div>
    </div>
    <div class="category-item__action" @click="play">
      {{ $t("play") }}
    </div>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";
import utils from "~/mixins/utils";

export default {
  name: "CategoryItem",
  components: {
    ProgressBar,
  },
  mixins: [utils],
  props: {
    category: {
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
    open() {
      this.$router.push(
        `/${this.moduleName}?serie=${this.$route.query.serie}&category=${this.category.id}`
      );
    },
    async play() {
      await this.$store.dispatch("testsList/fetchTests", {
        serieId: this.$route.query.serie,
        categoryId: this.category.id,
      });

      const maxTest = this.$store.state.testsList.tests.length;
      let selectedTest = null;
      for (let i = 0; i < maxTest; i++) {
        const test = this.$store.state.testsList.tests[i];
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
@import "/assets/scss/components/tests/category-item";
</style>
