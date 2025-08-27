import { createApp } from "vue";
import "vuetify/styles/main.css";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { capitalizeFirst } from "./directives/format";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

const app = createApp(App);

app.directive("capitalize-first", capitalizeFirst);

app.use(router).use(pinia).use(vuetify).mount("#app");
