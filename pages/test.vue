<template>
  <div>
    <PreviousTask :is-test="false" />
    <div><PreviousTask :is-test="true" /></div>
  </div>
</template>

<script>
import PreviousTask from "~/components/ui/PreviousTask";
export default {
  components: {
    PreviousTask,
  },
};
</script>

<style scoped>
.main {
  color: black;
}
</style>
