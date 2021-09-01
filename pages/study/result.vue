<template>
  <div class="tests-result">
    <div class="tests-result__top">
      <div class="tests-result__guidance">
        <div
          class="tests-result__guidance__link"
          @click="$router.push('/study/series')"
        >
          <img src="~/assets/icons/left-arrow-white.svg" />
          <div class="tests-result__guidance__text">{{ $t("study") }}</div>
        </div>
      </div>
    </div>
    <div class="tests-result__content">
      <div class="tests-result__description">
        <div class="tests-result__description__text">
          <div class="tests-result__description__title">
            {{ $t("test_complete") }}
          </div>
          <div class="tests-result__description__info">
            <ShortResultContent :result="result" />
          </div>
        </div>
        <div class="tests-result__description__action">
          <Button
            label="Try again"
            type="tertiary"
            size="large"
            icon="refresh"
            position="right"
            width="100%"
            height="56px"
            padding-top="17px"
            @click="$router.back()"
          />
          <Button
            v-if="nextTestId > 0"
            label="Next test"
            type="primary"
            size="large"
            icon="arrow-right-circle-selected"
            position="right"
            width="100%"
            height="56px"
            padding-top="20px"
            @click="goToNextTest()"
          />
        </div>
      </div>
      <div class="tests-result__compare">
        <div class="tests-result__title">{{ $t("compare_results") }}</div>
        <div
          v-if="user.paid && user.registered"
          class="tests-result__compare__content"
        >
          <ShortResult
            v-for="(item, key) in results"
            :key="key"
            :result="item"
          />
        </div>
        <div
          v-if="!user.paid && user.registered"
          class="tests-result__compare__content"
        >
          <Subscribe :subscribe="subscribe" :column="2" />
          <ShortResult :result="results[1]" />
        </div>
        <Subscribe
          v-if="!user.registered"
          :column="1"
          :subscribe="subscribeUnRegistered"
        />
      </div>
    </div>
    <div class="tests-result__review">
      <div class="tests-result__review__title">
        <div class="tests-result__title">{{ $t("review_answers") }}</div>
      </div>
      <ResultTab />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import utils from "~/mixins/utils";
import results from "~/mixins/results";
import ShortResultContent from "~/components/tests/ShortResultContent";
import Button from "~/components/ui/buttons/Button";
import ShortResult from "~/components/tests/ShortResult";
import Subscribe from "~/components/tests/Subscribe";
import ResultTab from "~/components/tests/ResultTab";

export default {
  name: "TestsResult",
  components: {
    ShortResultContent,
    Button,
    ShortResult,
    Subscribe,
    ResultTab,
  },
  mixins: [utils, results],
  async asyncData({ app, params, store }) {
    await store.dispatch("result/fetchResults", store.state.tests.testId);
  },
  data() {
    return {
      user: {
        paid: true,
        registered: true,
      },
      questionList: {
        all: [
          {
            id: 1,
            title: "Question 1",
            icon: "check-circle.svg",
            content: "",
            isRight: true,
          },
          {
            id: 2,
            title: "Question 2",
            icon: "close-circle-black.svg",
            content: "name",
            isRight: true,
          },
          {
            id: 3,
            title: "Question 3",
            icon: "check-circle.svg",
            content: "",
            isRight: false,
          },
          {
            id: 4,
            title: "Question 4",
            icon: "close-circle-black.svg",
            content: "",
            isRight: false,
          },
        ],
        mistakes: [
          {
            id: 5,
            title: "Question 5",
            icon: "check-circle.svg",
            content: "",
            isRight: false,
          },
          {
            id: 6,
            title: "Question 6",
            icon: "close-circle-black.svg",
            content: "name",
            isRight: false,
          },
          {
            id: 7,
            title: "Question 7",
            icon: "check-circle.svg",
            content: "",
            isRight: true,
          },
          {
            id: 8,
            title: "Question 8",
            icon: "close-circle-black.svg",
            content: "",
            isRight: true,
          },
        ],
      },
      subscribeUnRegistered: {
        image: "category3.png",
        content: "Sign up to compare results.",
        button: "Sign up",
      },
      subscribe: {
        image: "unpaid.png",
        content: "Subscribe to a full membership to see your best result!",
        button: "Subscribe",
      },
    };
  },
  computed: {
    result() {
      return this.currentResult;
    },
    results() {
      if (this.lastResult !== null) {
        return [this.bestResult, this.lastResult];
      } else if (this.bestResult !== null) {
        return [this.bestResult];
      } else {
        return [];
      }
    },
    nextTestId() {
      const currentTestId = this.$store.state.tests.testId;
      const categoryTests = this.$store.getters["studyList/getTests"];
      for (const index in categoryTests) {
        if (
          categoryTests.length - 1 >= index + 1 &&
          categoryTests[index].id === Number(currentTestId)
        ) {
          console.log(Number(index) + 1);
          return categoryTests[Number(index) + 1].id;
        }
      }
      return -1;
    },
  },
  methods: {
    // transformDate(dateTimeString) {
    //   return moment(dateTimeString.substring(0, 10), "YYYY-MM-DD").format(
    //     "DD MMM YYYY"
    //   );
    // },
    formatDuration(duration) {
      const momentDuration = moment.duration(duration);
      return moment.utc(momentDuration.as("milliseconds")).format("m:ss");
    },
    goToNextTest() {
      if (this.nextTestId > 0) {
        this.$router.push(`/tests/board?test=${this.nextTestId}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/tests-result";
</style>
