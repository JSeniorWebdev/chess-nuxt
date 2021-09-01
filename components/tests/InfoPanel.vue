<template>
  <div class="board__top">
    <div class="board__progress desktop">
      <vue-ellipse-progress
        :progress="progress"
        font-color="white"
        :size="40"
        :legend="false"
      />
      <div class="board__progress-label">{{ number }} / {{ count }}</div>
    </div>
    <div v-if="!moduleName.includes('study')" class="board__timer">
      <img src="~/assets/icons/timer.svg" />
      <div class="board__timer-label">{{ timeLabel }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPanel",
  props: {
    number: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      time: 0,
      timeLabel: "",
      interval: null,
    };
  },
  computed: {
    progress() {
      return (this.number / this.count) * 100;
    },
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
  },
  mounted() {
    this.interval = setInterval(this.timer, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    timer() {
      this.time++;
      const min = Math.floor(this.time / 60)
        .toString()
        .padStart(2, "0");
      const sec = (this.time % 60).toString().padStart(2, "0");
      this.timeLabel = `${min}:${sec}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
