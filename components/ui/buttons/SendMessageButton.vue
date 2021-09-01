<template>
  <div>
    <v-btn depressed color="primary" class="button__with-icon" @click="onClick">
      <img class="button__icon-spacing" src="~/assets/icons/speech.svg" />
      {{ $t("send_message") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit("on-click");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/buttons/button";
</style>
