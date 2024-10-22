<template>
  <div class="container-fluid" v-if="data">
    <div class="director">
      <router-link to="/" class="router-link">Home</router-link> |
      <span class="director-title"> {{ categoryTitle }}</span>
    </div>
    <div class="row all-products gy-5">
      <div class="col-2" v-for="product in data" :key="product.id">
        <router-link
          :to="{
            path: `/${product.category}/${product.title}`,
            query: { id: product.id },
          }"
          class="router-link"
        >
          <Product :product="product" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../config.js";
import { categoriesList } from "../config.js";
import Product from "../components/ProductComp.vue";
export default {
  components: { Product },
  data() {
    return {
      data: null,
    };
  },
  computed: {
    categorySlug() {
      return this.$route.params.slug;
    },
    categoryTitle() {
      return categoriesList.find(
        (category) => category.slug === this.categorySlug
      ).name;
    },
  },
  methods: {
    fetchData() {
      fetch(API_URL + `/category/${this.categorySlug}?limit=0`)
        .then((res) => res.json())
        .then((data) => {
          this.data = data.products;
        });
    },
  },

  created() {
    this.fetchData();
  },
  watch: {
    categorySlug(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchData();
      }
    },
  },
};
</script>

<style scoped>
.director {
  margin: 2rem;
}
.director-title {
  font-weight: 600;
}
</style>
