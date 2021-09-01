<template>
  <div class="onboarding">
    <v-card class="card">
      <v-card-title class="card__title">
        <h1 class="card__title__content">Welcome</h1>
      </v-card-title>
      <v-card-text class="form">
        <v-form>
          <div class="form__title">Finish your profile</div>
          <div class="form__input photo">
            <div class="form__input__label">
              Profile picture
              <span class="form__input__label__optional">(Optional)</span>
            </div>
            <ImageUploader :after-upload="saveAvatar" />
          </div>
          <div class="form__input">
            <div class="form__input__label">Username</div>
            <v-text-field
              v-model="username"
              class="form__input__field"
              label="Username"
              outlined
            />
          </div>
          <div class="form__input role">
            <div class="form__input__label">You register as</div>
            <div class="form__input__field-group">
              <RoleButton
                :selected="role === 'user'"
                label="student"
                @click="setRole('user')"
              />
              <RoleButton
                :selected="role === 'coach'"
                label="coach"
                @click="setRole('coach')"
              />
            </div>
          </div>
          <div class="form__input level">
            <div class="form__input__label level">Choose your level</div>
            <LevelButton
              :selected="level === 'beginner'"
              label="Beginner"
              @click="setLevel('beginner')"
            />
            <LevelButton
              :selected="level === 'intermediate'"
              label="Intermediate"
              @click="setLevel('intermediate')"
            />
            <LevelButton
              :selected="level === 'advanced'"
              label="Advanced"
              @click="setLevel('advanced')"
            />
          </div>
          <v-btn
            depressed
            color="primary"
            class="form__input__button"
            :class="isFilled ? 'selected' : ''"
            @click="saveProfile"
          >
            Continue
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import utils from "~/mixins/utils";
import LevelButton from "~/components/ui/buttons/LevelButton";
import RoleButton from "~/components/ui/buttons/RoleButton";
import ImageUploader from "~/components/ui/ImageUploader";

export default {
  name: "Onboarding",
  components: {
    LevelButton,
    ImageUploader,
    RoleButton,
  },
  mixins: [utils],
  data() {
    return {
      level: "",
      role: "",
      username: "",
    };
  },
  computed: {
    isFilled() {
      return this.username !== "" && this.role !== "" && this.level !== "";
    },
  },
  created() {
    this.$router.push(this.getPageAfterLogin());
  },
  methods: {
    setLevel(level) {
      this.level = level;
    },
    setRole(role) {
      this.role = role;
    },
    saveAvatar(file) {
      this.$store
        .dispatch("saveAvatar", {
          data: {},
          files: {
            avatar: file,
          },
        })
        .catch(() => this.$toast.error(this.$t("avatar_image_upload_error")));
    },
    saveProfile() {
      this.$store
        .dispatch("onBoardingSave", {
          role: this.role,
          level: this.level,
          email: this.$auth.user.email,
          username: this.username,
        })
        .then(() => {
          this.$auth.fetchUser();
          setTimeout(() => this.$router.push(this.getPageAfterLogin()), 100);
        })
        .catch(() => this.$toast.error(this.$t("profile_save_error")));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/onboarding";
</style>
