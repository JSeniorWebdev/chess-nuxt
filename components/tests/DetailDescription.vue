<template>
  <div class="detail-description">
    <div class="detail-description__text">
      <div class="detail-description__text__title">
        {{ test.title }}
      </div>
      <div class="detail-description__text__content">
        {{ test.content }}
      </div>
    </div>
    <div class="detail-description__action">
      <div class="detail-description__action__top">
        <div class="detail-description__action__wrap">
          <img src="~/assets/icons/alarm.svg" />
          <div>{{ test.duration }} minutes</div>
        </div>
        <div class="detail-description__action__wrap">
          <img src="~/assets/icons/question.svg" />
          <div>{{ test.question }} questions</div>
        </div>
      </div>
      <Button
        :label="$t('play')"
        type="primary"
        size="large"
        icon="arrow-right-circle-selected"
        position="right"
        width="100%"
        height="56px"
        padding-top="20px"
        @click="$router.push(`/${moduleName}/board?test=${$route.query.id}`)"
      />
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/buttons/Button";

export default {
  name: "DetailDescription",
  components: {
    Button,
  },
  props: {
    test: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {
    moduleName() {
      if (this.$route.name.includes("study")) return "study";
      else return "tests";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/detail-description";
</style>
