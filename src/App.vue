<template>
  <header>
    <CategoryList />
    <SeachBar />
    <Setting />
  </header>
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
import CategoryList from "./components/CategoryList.vue";
import SeachBar from "./components/SearchBar.vue";
import Setting from "./components/SettingComp.vue";
export default {
  components: {
    CategoryList,
    SeachBar,
    Setting,
  },
};
</script>
