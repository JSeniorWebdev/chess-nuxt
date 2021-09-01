<template>
  <div class="default-header">
    <div class="default-header__container">
      <div class="default-header__menu mobile">
        <img
          class="default-header__menu__icon"
          src="~/assets/icons/menu-white.svg"
          @click="menuOpened = true"
        />
        <NavMenu v-if="menuOpened" :page="page" @close-menu="closeMenu" />
      </div>
      <ul class="default-header__tab desktop">
        <li class="default-header__tab__item">
          <NuxtLink to="/tests/series" class="default-header__tab__item__link">
            Dashboard
          </NuxtLink>
        </li>
        <li class="default-header__tab__item">
          <NuxtLink to="/profile" class="default-header__tab__item__link">
            My profile
          </NuxtLink>
        </li>
        <li class="default-header__tab__item">
          <NuxtLink to="/" class="default-header__tab__item__link">
            Blog
          </NuxtLink>
        </li>
        <li class="default-header__tab__item">
          <NuxtLink to="/" class="default-header__tab__item__link">
            E-shop
          </NuxtLink>
        </li>
      </ul>
      <div class="default-header_logo">My-Chess</div>
      <ul class="default-header__nav">
        <li class="default-header__nav__item desktop">
          <a
            class="default-header__nav__item__link logout-button"
            @click="logout"
          >
            Log out
          </a>
        </li>
        <li class="default-header__nav__item mobile">
          <a class="default-header__nav__item__link">
            <img
              v-if="$auth.user.avatar"
              :src="$auth.user.avatar"
              class="default-header__avatar"
            />
            <div v-else class="default-header__temp-avatar">
              {{ $auth.user.full_name.charAt(0) }}
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavMenu from "~/components/layout/NavMenu";

export default {
  name: "DefaultHeader",
  components: {
    NavMenu,
  },
  data() {
    return {
      menuOpened: false,
      page: "profile",
    };
  },
  methods: {
    closeMenu() {
      this.menuOpened = false;
    },
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/layout/default-header";
@import "/assets/scss/components/ui/buttons/logout-button";
</style>
