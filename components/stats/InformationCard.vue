<template>
  <div class="spacing">
    <div class="main-container">
      <div class="main-container__heading">
        <div>
          <img class="main-container__img" :src="cardTitleImage" />
        </div>
        <div>
          {{ infoCardType }}
        </div>
      </div>
      <div :class="['main-container__color-bar', bgColor]" @click="expand">
        <div class="main-container__completed">
          {{ cardTitle }}
        </div>
        <div>
          <img class="main-container__expand-img" :src="expanded" />
        </div>
      </div>
      <div v-if="isExpanded && !isTime" class="expanded-container">
        <div class="expanded-container__stats">
          <InformationCardRow
            :id="0"
            :percentage="percentage1"
            :difficulty="difficulty1"
          />
          <InformationCardRow
            :id="1"
            :percentage="percentage2"
            :difficulty="difficulty2"
          />

          <InformationCardRow
            :id="2"
            :percentage="percentage3"
            :difficulty="difficulty3"
          />
        </div>
        <div class="bottom-container">
          <div>
            <div class="bottom-container__heading">
              {{ $t("total_opened") }}
            </div>
            <div class="bottom-container__value">{{ totalOpened }}</div>
          </div>
          <div>
            <div class="bottom-container__heading">{{ $t("time_spent") }}</div>
            <div class="bottom-container__value">{{ timeSpent }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="isExpanded" class="expanded-container">
          <div class="expanded-container__stats">
            <div class="expanded-container__stat-row view-text-center">
              <div>{{ lastWeekTime }} {{ $t("last_week") }}</div>
            </div>
          </div>
          <div class="bottom-container">
            <div>
              <div class="bottom-container__heading">
                {{ $t("tests_last_week") }}
              </div>
              <div class="bottom-container__value">{{ time }}</div>
            </div>
            <div>
              <div class="bottom-container__heading">
                {{ $t("learning_last_week") }}
              </div>
              <div class="bottom-container__value">{{ time }}</div>
            </div>
            <div>
              <div class="bottom-container__heading">
                {{ $t("competitions_total") }}
              </div>
              <div class="bottom-container__value">{{ time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InformationCardRow from "~/components/stats/InformationCardRow";
export default {
  components: {
    InformationCardRow,
  },
  props: {
    isTest: {
      type: Boolean,
      default: false,
    },
    isLearning: {
      type: Boolean,
      default: false,
    },
    isTime: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      numberCompleted: 21,
      lastWeekTime: "05:30:43",
      time: "14:23:01",
      totalTime: "104:50:03",
      percentage1: "10%",
      percentage2: "20%",
      percentage3: "70%",
      difficulty1: "easy",
      difficulty2: "medium",
      difficulty3: "hard",
      totalOpened: 24,
      timeSpent: "14:23:01",
      isExpanded: false,
      imageSource: "",
    };
  },
  computed: {
    bgColor() {
      if (this.isTest) {
        return "view-bg-test";
      } else if (this.isLearning) {
        return "view-bg-learning";
      } else {
        return "view-bg-time";
      }
    },
    expanded() {
      if (!this.isExpanded) {
        return require("~/assets/icons/add.svg");
      } else {
        return require("~/assets/icons/minus-circle.svg");
      }
    },
    cardTitleImage() {
      if (this.isTest) {
        return require("~/assets/icons/check-circle.svg");
      } else if (this.isLearning) {
        return require("~/assets/icons/book.svg");
      } else {
        return require("~/assets/icons/timer.svg");
      }
    },
    cardTitle() {
      if (!this.isTime) {
        return this.numberCompleted + " " + this.$t("completed");
      } else {
        return this.totalTime + " " + this.$t("total_time");
      }
    },
    infoCardType() {
      if (this.isTest) {
        return this.$t("tests");
      } else if (this.isLearning) {
        return this.$t("learning");
      } else {
        return this.$t("time_spent_on_studying");
      }
    },
  },
  methods: {
    expand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/stats/information-card.scss";
</style>
