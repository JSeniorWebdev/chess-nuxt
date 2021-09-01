<template>
  <div class="move-question">
    <div class="correct-move" :class="[option ? 'selected' : '']">
      {{ option ? "K" + option.join("-") : "Correct move" }}
      <img
        v-if="option"
        class="option-icon"
        src="~/assets/icons/close-circle-black.svg"
        @click="removeOption($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MoveQuestion",
  computed: {
    option: {
      get() {
        const answer = this.$store.getters["tests/currentAnswer"];
        if (answer === undefined) {
          return "";
        } else {
          if (answer.value) this.$emit("add-option", "fieldmarketing");
          return answer.value;
        }
      },
      set(value) {
        this.$store.commit("tests/setAnswerValue", value);
      },
    },
  },
  methods: {
    removeOption(event) {
      event.stopPropagation();
      this.option = "";
      this.$emit("remove-option", "fieldmarketing");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/questions/move-question";
</style>
