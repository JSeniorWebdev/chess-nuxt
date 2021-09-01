<template>
  <div class="main-container">
    <div
      :class="
        !closed ? 'main-container__left' : 'main-container__left__expanded'
      "
    >
      <div class="main-container__left__title">
        {{ competition.title }}
      </div>
      <div class="main-container__left__chip">
        <Chip
          type="competition"
          :text="competition.is_chess_to_schoold ? $t('šachy_do_škol') : ''"
        />
      </div>
      <div class="main-container__left__info">
        <div v-if="!closed" class="main-container__left__info__date">
          {{ String(competition.active_from).split("T")[0] }} -
          {{ String(competition.active_to).split("T")[0] }}
        </div>
        <div v-else class="main-container__left__info__date">
          {{ $t("closed") }}
        </div>
        <div class="main-container__left__info__participants">
          {{
            $tc("competition_participants", competition_participants, {
              count: competition_participants,
            })
          }}
        </div>
      </div>
      <div v-if="competition.description" class="main-container__left__desc">
        {{ competition }}
      </div>
    </div>
    <div
      v-if="!closed"
      :class="[
        'main-container__right__bigger',
        'max-width',
        resized ? 'hide' : '',
      ]"
    >
      <div v-if="!icons">
        <IconSet :competition="competition" />
      </div>
      <div v-if="!closed">
        <v-btn
          class="primary button__with-icon main-container__right__button"
          @click="navToCompetition"
        >
          Play
          <img
            class="button__icon-spacing-right"
            src="~/assets/icons/arrow-right-circle-selected.svg"
          />
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Chip from "~/components/ui/Chip";
import IconSet from "~/components/ui/icon-set/CompetitionIconSet";

export default {
  components: { Chip, IconSet },
  props: {
    competition: {
      type: Object,
      required: true,
    },
    closed: {
      type: Boolean,
      required: true,
    },
    resized: {
      type: Boolean,
      required: true,
    },
    icons: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      comp: "",
    };
  },
  methods: {
    navToCompetition() {
      this.$router.push(`/competitions/details/?id=${this.competition.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/competition-tile";
@import "/assets/scss/components/ui/buttons/button";
@import "/assets/scss/components/tests/category-item";
</style>
