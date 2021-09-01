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
            <p class="text" background="red">{{ coach.name }}</p>
            <Chip
              :group-detail="false"
              :coach-detail="true"
              :text="$t('coach')"
            />
          </div>
        </div>
        <div class="coach__content__button">
          <UserAcceptCoachRequestButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chip from "~/components/ui/Chip";
import UserAcceptCoachRequestButton from "~/components/ui/buttons/UserAcceptCoachRequestButton.vue";

export default {
  components: {
    UserAcceptCoachRequestButton,
    Chip,
  },

  data() {
    return {
      coach: {
        id: 1,
        name: "Eliška Nováková",
      },
      group: {
        id: 1,
        title: "Coach's group 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu...",
        student_count: 10,
      },
    };
  },
};
</script>

<style lang="scss">
@import "assets/scss/pages/coach/details";
</style>
