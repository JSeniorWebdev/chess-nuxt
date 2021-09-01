<template>
  <div class="number-field-question">
    <v-text-field
      v-model="number"
      label="Type in a number"
      type="number"
      max-length="6"
      outlined
      @blur="blurOption"
      @change="changeOption"
    />
  </div>
</template>

<script>
export default {
  name: "NumberFieldQuestion",
  computed: {
    number: {
      get() {
        const answer = this.$store.getters["tests/currentAnswer"];
        if (answer === undefined) {
          return "";
        } else {
          return answer.value;
        }
      },
      set(value) {
        this.$store.commit("tests/setAnswerValue", Number(value));
      },
    },
  },
  methods: {
    focusOption() {
      if (!this.number) this.$emit("add-option", "numberfield");
    },
    blurOption() {
      if (!this.number) this.$emit("remove-option", "numberfield");
    },
    changeOption() {
      if (this.number) this.$emit("add-option", "numberfield");
      else this.$emit("remove-option", "numberfield");
    },
  },
};
</script>
