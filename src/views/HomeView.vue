<template>
  <div class="row all-products gy-5" v-if="data">
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
  <div v-else>
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div id="pagination">
    <a href="#" class="page-item active" @click="paginate($event)">1</a>
    <a href="#" class="page-item" @click="paginate($event)">2</a>
    <a href="#" class="page-item" @click="paginate($event)">3</a>
    <a href="#" class="page-item" @click="paginate($event)">4</a>
    <a href="#" class="page-item" @click="paginate($event)">5</a>
    <a href="#" class="page-item" @click="paginate($event)">6</a>
    <a href="#" class="page-item" @click="paginate($event)">7</a>
  </div>
</template>

<script>
import { API_URL } from "../config.js";
import Product from "../components/ProductComp.vue";
export default {
  components: { Product },
  data() {
    return {
      data: null,
      page: 0,
    };
  },
  methods: {
    fetchData(page) {
      try {
        fetch(API_URL + `?limit=30&skip=${page * 30}`)
          .then((res) => res.json())
          .then((data) => {
            this.data = data.products;
          });
      } catch (error) {
        console.log(error);
      }
    },
    paginate(event) {
      const pagination = document.getElementById("pagination");

      const hadActive = pagination.querySelector(".page-item.active");
      if (hadActive) {
        hadActive.classList.remove("active");
      }
      event.target.classList.add("active");
      const number = parseInt(event.target.innerText);
      this.page = number;
      this.fetchData(this.page - 1);
    },
  },

  created() {
    this.fetchData(this.page);
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartNumber = document.querySelector(".number");
    if (cartNumber) {
      cartNumber.innerText = this.cart.length;
    }
  },
};
</script>

<style scoped>
#pagination {
  width: 100%;
  text-align: center;
  margin: 3rem 0;
}

#pagination .page-item {
  text-decoration: none;
  color: #000;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #72ccfd;
  margin: 0 1rem;
  line-height: 40px;
  border-radius: 50%;
  color: #fff;
}

#pagination .page-item.active {
  background: #2434e5;
}
/*  */

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
}

.loader > span {
  border: 3px solid transparent;
  border-top-color: #ff3e00;
  border-right-color: #ff3e00;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
}

.loader > span:nth-child(1) {
  width: 3.5em;
  height: 3.5em;
  margin-left: -1.75em;
  margin-top: -1.75em;
  animation: spin 2s linear infinite;
}

.loader > span:nth-child(2) {
  width: 2.1em;
  height: 2.1em;
  margin-left: -1.05em;
  margin-top: -1.05em;
  animation: spin 1.75s linear reverse infinite;
}

.loader > span:nth-child(3) {
  width: 0.8em;
  height: 0.8em;
  margin-left: -0.4em;
  margin-top: -0.4em;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
