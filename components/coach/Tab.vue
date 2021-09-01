<template>
  <div class="tab">
    <v-card>
      <v-tabs bright background-color="teal darken-3" show-arrows>
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
        <v-tab
          v-for="(tab, i) in tabs"
          :key="`tab_${i}_${tab}`"
          :href="`#tab-${i}`"
          @click="changeTab(tab)"
        >
          {{ $t(tab) }}
        </v-tab>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeTab(tab) {
      this.$emit("change-tab", tab);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/tab";
</style>
