<template>
  <div class="auth-header notLogined">
    <div class="auth-header__container">
      <div class="auth-header__logo">My-Chess</div>
      <ul class="auth-header__nav">
        <li class="auth-header__nav__item">
          <router-link
            :to="{ name: 'register' }"
            class="auth-header__nav__item__link register-button"
          >
            Register
          </router-link>
        </li>
        <li class="auth-header__nav__item">
          <router-link
            :to="{ name: 'login' }"
            class="auth-header__nav__item__link login-button"
          >
            Sign In
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthHeader",
};
</script>

<style lang="scss">
@import "/assets/scss/components/layout/auth-header";
</style>
