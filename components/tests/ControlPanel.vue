<template>
  <div class="board__bottom">
    <Button
      label="Previous"
      type="tertiary"
      size="large"
      :icon="getPreviousIcon"
      color="green"
      width="120px"
      :disabled="!step ? 'disabled' : ''"
      @click="$emit('previous-button-click')"
    />
    <Button
      label="End"
      type="tertiary"
      size="large"
      icon="close-circle"
      color="red"
      width="95px"
      @click="$emit('end-button-click')"
    />
    <Button
      label="Next"
      type="tertiary"
      size="large"
      :icon="getNextIcon"
      color="green"
      position="right"
      width="120px"
      :selected="
        !lastQuestion &&
        ((option === 5 && optionName === 'selectorder') ||
          (option && optionName === 'moverequest') ||
          (option && optionName === 'move') ||
          (option && optionName === 'multiplechoice') ||
          (option && optionName === 'numberfield') ||
          (option && optionName === 'fieldmarketing'))
          ? 'selected'
          : ''
      "
      :disabled="lastQuestion ? 'disabled' : ''"
      @click="$emit('next-button-click')"
    />
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "ControlPanel",
  components: {
    Button,
  },
  props: {
    option: {
      type: Number,
      required: true,
    },
    nextIcon: {
      type: String,
      required: true,
      default: "arrow-right-circle",
    },
    optionName: {
      type: String,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    lastQuestion: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    getPreviousIcon() {
      return this.step ? "arrow-left-circle" : "arrow-left-circle-disabled";
    },
    getNextIcon() {
      return this.lastQuestion ? "arrow-right-circle-disabled" : this.nextIcon;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/board";
</style>
