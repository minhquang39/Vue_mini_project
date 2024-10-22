import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style/bootstrap.min.css";
import "./style/style.css";
import VueLazyload from "vue3-lazyload";

const app = createApp(App);
app.use(VueLazyload, {
  preLoad: 1.3,
  error: "path/to/error-image.png",
  loading: "path/to/loading-image.gif",
  attempt: 1,
});

app.use(router).mount("#app");
