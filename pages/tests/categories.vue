<template>
  <div class="categories">
    <div
      class="categories__top"
      :style="{ backgroundColor: currentSerie.color }"
    >
      <div class="categories__guidance">
        <div class="categories__guidance__content">
          <div class="categories__guidance__link" @click="$router.back()">
            <img src="~/assets/icons/left-arrow.svg" />
            <div class="categories__guidance__text">Tests</div>
          </div>
          <div class="categories__level" @click="showLevelModal">
            {{ levelLabel }}
          </div>
          <LevelModal
            v-if="isVisibleLevelModal"
            :level="level"
            @close="closeModal"
          />
        </div>
        <div class="categories__title">{{ currentSerie.name }}</div>
      </div>
    </div>
    <div class="categories__content">
      <div class="categories__content__list">
        <CategoryItem
          v-for="(category, i) in $store.state.testsList.categories"
          :key="i"
          :category="category"
        />
      </div>
      <div class="categories__content__learn">
        <InfoCard v-for="(item, key) in learn" :key="key" :card="item" />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from "~/components/tests/CategoryItem";
import InfoCard from "~/components/ui/InfoCard";
import LevelModal from "~/components/tests/LevelModal";

export default {
  name: "Categories",
  components: {
    CategoryItem,
    InfoCard,
    LevelModal,
  },
  async asyncData({ app, params, route, store, query }) {
    if (query.serie !== undefined) {
      await store.dispatch("testsList/fetchCategories", Number(query.serie));
    }
    if (store.state.testsList.series.length === 0) {
      await store.dispatch("testsList/fetchSeries");
    }
  },
  data() {
    return {
      learn: [
        {
          icon: "whh_student",
          title: "vyuka",
          subtitle: "mat",
          text: "Secondary line text goes here Secondary line text goes here",
          image: "learn",
        },
        {
          icon: "book",
          title: "sachopedie",
          subtitle: "mat",
          text: "Secondary line text goes here Secondary line text goes here",
          image: "learn",
        },
      ],
      isVisibleLevelModal: false,
      level: "beginner",
    };
  },
  computed: {
    levelLabel() {
      switch (this.level) {
        case "beginner":
          return "Easy";
        case "intermediate":
          return "Medium";
        case "advanced":
          return "Hard";
        default:
          return this.level;
      }
    },
    currentSerie() {
      if (this.$route.query.serie !== undefined) {
        return this.$store.state.testsList.series.find(
          (item) => item.id === Number(this.$route.query.serie)
        );
      }
      return null;
    },
  },
  methods: {
    showLevelModal() {
      this.isVisibleLevelModal = true;
    },
    closeModal(levelNew) {
      this.isVisibleLevelModal = false;
      if (levelNew) this.level = levelNew;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/pages/tests/categories";
</style>
