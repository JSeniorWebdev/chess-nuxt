<template>
  <div class="test-item">
    <div class="test-item__left" @click="showDetail(test.id)">
      <div class="test-item__left__main">
        <div class="test-item__left__number">
          <div class="test-item__left__number__text">
            {{ pad }}
          </div>
          <img
            v-if="test.selected === status.COMPLETED"
            src="~/assets/icons/completed.svg"
          />
          <img
            v-if="test.selected === status.NOTSTARTED"
            src="~/assets/icons/notstarted.svg"
          />
          <img
            v-if="test.selected === status.UNFINISHED"
            src="~/assets/icons/completed.svg"
          />
        </div>
        <div class="test-item__left__title">
          <div class="test-item__left__title__text">
            {{ test.title }}
          </div>
          <div class="test-item__left__title__review">
            <img
              v-for="indexColor in test.review"
              :key="indexColor"
              src="~/assets/icons/star-color.svg"
            />
            <img
              v-for="indexNonColor in 3 - test.review"
              :key="indexNonColor"
              src="~/assets/icons/star-noncolor.svg"
            />
          </div>
        </div>
      </div>
      <div class="test-item__left__secondary">
        <div class="test-item__info">
          <div class="desktop">
            {{ test.question }}
            {{ test.question > 1 ? " questions" : " question" }}
          </div>
          <div class="test-item__point desktop">•</div>
          <div class="test-item__duration">{{ test.duration }} min</div>
        </div>
        <div class="test-item__left__difficulty">
          <img
            v-if="test.difficulty === difficulty.EASY"
            src="~/assets/icons/easy.svg"
          />
          <img
            v-if="test.difficulty === difficulty.MEDIUM"
            src="~/assets/icons/medium.svg"
          />
          <img
            v-if="test.difficulty === difficulty.HARD"
            src="~/assets/icons/hard.svg"
          />
          <div class="test-item__left__difficulty__text">
            {{ test.difficulty }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="test-item__right"
      @click="$router.push(`/${moduleName}/board?test=${test.id}`)"
    >
      {{ $t("play") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TestItem",
  props: {
    test: {
      type: Object,
      required: true,
      default: null,
    },
    currentSerie: {
      type: Object,
      required: true,
      default: null,
    },
    currentCategory: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      status: {
        COMPLETED: "completed",
        NOTSTARTED: "not started",
        UNFINISHED: "unfinished",
      },
      difficulty: {
        EASY: "easy",
        MEDIUM: "medium",
        HARD: "hard",
      },
    };
  },
  computed: {
    pad() {
      return this.test.number.toString().padStart(2, "0");
    },
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
  },
  methods: {
    showDetail(id) {
      this.$router.push(
        `/${this.moduleName}/detail?serie=${this.currentSerie.id}&category=${this.currentCategory.id}&id=${id}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/test-item";
</style>
