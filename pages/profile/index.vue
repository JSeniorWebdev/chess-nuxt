<template>
  <div class="profile">
    <div class="profile__main">
      <div class="profile__main__content">
        <div class="profile__main__content__info">
          <div
            v-if="user.avatarUrl"
            class="profile__main__content__info__photo"
            :style="{ backgroundImage: 'url(' + user.avatarUrl + ')' }"
          ></div>
          <div v-else class="profile__main__content__info__temp-avatar">
            {{ user.name.charAt(0) }}
          </div>
          <div class="profile__main__content__info__info">
            <div class="profile__main__content__info__info__user-name">
              {{ user.name }}
            </div>
            <div class="profile__main__content__info__info__user-email">
              {{ user.email }}
            </div>
          </div>
          <div class="profile__main__content__info__user-role">
            {{ user.role }}
          </div>
        </div>
        <NuxtLink to="/profile/edit">
          <v-btn
            depressed
            color="primary"
            class="profile__main__content__button"
            >Upravit profil</v-btn
          >
        </NuxtLink>
      </div>
    </div>
    <div class="profile__body">
      <div class="profile__body__content">
        <div class="profile__body__content__item"></div>
        <div class="profile__body__content__item last-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { USER_ROLES } from "~/utils/constants";
export default {
  name: "Profile",
  data() {
    return {
      user: {
        name: this.$auth.user.full_name,
        email: this.$auth.user.email,
        avatarUrl: this.$auth.user.avatar,
        role: USER_ROLES[this.$auth.user.role],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile/profile";
</style>
