export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s",
    title: "My-chess",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSMatN6KGphiZfQzLV-wymEyD_lftWJgU&libraries=places&language=en",
      },
    ],
  },

  loading: { color: "#C7417B" },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "vue-slick-carousel/dist/vue-slick-carousel-theme.css",
    "vue-slick-carousel/dist/vue-slick-carousel.css",
  ],

  axios: {
    baseURL: process.env.SERVER_URL || "https://api-dev.my-chess.com",
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/chessBoard", mode: "client" },
    { src: "~/plugins/vueEllipseProgress", mode: "client", ssr: false },
    { src: "@plugins/vue-draggable-resizable", ssr: false },
    { src: "@plugins/progressBar", mode: "client" },
    { src: "@plugins/vue-slick-carousel", mode: "client" },
    { src: "~plugins/vue-google-oauth2", ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    "@nuxtjs/style-resources",
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
  ],

  auth: {
    strategies: {
      local: {
        token: {
          property: "access",
          required: true,
          type: "Bearer",
        },
        user: {
          property: "",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "/api/users/auth/",
            method: "post",
            propertyName: "access",
          },
          user: {
            url: "/api/users/detail/",
            method: "get",
            propertyName: false,
          },
          logout: false,
        },
      },
    },
  },

  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "en",
    strategy: "no_prefix",
    noPrefixDefaultLocale: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      onlyOnRoot: true, // recommended
    },
  },

  toast: {
    position: "top-center",
    duration: 2000,
    keepOnHover: true,
    fullWidth: true,
    action: {
      text: "Close",
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      },
    },
  },

  router: {
    middleware: ["auth"],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/svg",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    "nuxt-i18n",
    "nuxt-moment",
  ],

  styleResources: {
    scss: ["~/assets/scss/definitions.scss"],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // transpile: ["vue-advanced-chat", "chat"],
  },
};
