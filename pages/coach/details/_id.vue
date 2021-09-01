<template>
  <div class="coach">
    <div class="coach__content-container">
      <div class="coach__content">
        <div class="coach__content__info">
          <img
            class="coach__content__info__profile-photo"
            src="~/assets/images/profile_avatar.png"
          />
          <div class="coach__content__coach-details">
            <p class="text" background="red">{{ coach.display_name }}</p>
            <Chip
              :groupdetail="false"
              :coachdetail="true"
              :text="$t('coach')"
            />
          </div>
        </div>
        <div class="coach__content__button">
          <SendMessage />
        </div>
      </div>
    </div>
    <div class="coach__study-groups">
      <div class="coach__study-groups__title">
        <p>{{ $t("study_group") }}</p>
      </div>
      <div class="coach__study-groups__list">
        <StudyGroup :group="group" />
      </div>
    </div>
  </div>
</template>

<script>
import SendMessage from "~/components/ui/buttons/SendMessageButton";
import StudyGroup from "~/components/coach/StudyGroup";
import Chip from "~/components/ui/Chip";

export default {
  components: {
    SendMessage,
    StudyGroup,
    Chip,
  },
  data() {
    return {
      coach: {},
      group: {
        id: 1,
        title: "Coach's group 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...",
        student_count: 10,
      },
    };
  },
  mounted() {
    this.$store
      .dispatch("coach/getCoach", this.$route.query.id)
      .then((response) => {
        this.coach = response.coach;
      });
  },
};
</script>

<style lang="scss">
@import "assets/scss/pages/coach/details";
</style>
