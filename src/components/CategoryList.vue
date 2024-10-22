<template>
  <div class="categorys" v-if="categories && categories.length">
    <router-link to="/" class="router-link"
      ><span class="category-name">Home</span></router-link
    >
    <router-link
      v-for="category in categories.slice(0, 4)"
      :key="category.slug"
      :to="`/${category.slug}`"
      class="router-link"
    >
      <span class="category-name">{{ category.name }} </span>
    </router-link>
    <span class="other">
      Others
      <div class="menu-dropdown">
        <router-link
          v-for="category in categories.slice(4)"
          :key="category.slug"
          :to="`/${category.slug}`"
          class="router-link"
          :categoryName="category.name"
        >
          <span class="category-name">{{ category.name }} </span>
        </router-link>
      </div>
    </span>
  </div>
</template>
<script>
import { API_URL } from "../config.js";
export default {
  data() {
    return {
      categories: null,
    };
  },

  created() {
    fetch(API_URL + "/categories")
      .then((res) => res.json())
      .then((data) => {
        this.categories = data;
      });
  },

  mounted() {},
};
</script>
