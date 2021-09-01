<template>
  <div class="main-container">
    <div class="main-container__title view-mb8">{{ group.title }}</div>
    <Chip
      class="view-mb8"
      :group-detail="true"
      :coach-detail="false"
      :text="$tc('student', group.students, { count: group.students })"
    />
    <div class="view-mb16">{{ group.description }}</div>
    <GroupEditButton />
  </div>
</template>

<script>
import Chip from "~/components/ui/Chip";
import GroupEditButton from "~/components/ui/buttons/GroupEditButton";

export default {
  components: {
    Chip,
    GroupEditButton,
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/coach/edit-group-tile";
@import "~/assets/scss/components/ui/buttons/button";
</style>
