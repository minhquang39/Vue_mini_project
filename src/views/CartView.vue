<template>
  <div class="container-fluid">
    <div class="row pt-3">
      <div class="col-8">
        <div>
          <span class="text-uppercase fw-bold fs-4"
            >cart ({{ getCartNumber }} items)</span
          >
          <table class="mt-4">
            <tr class="">
              <th class="text-center">Product name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total amount</th>
            </tr>
            <tr v-for="(product, index) in data" :key="index">
              <td class="d-flex">
                <img :src="`${product.thumbnail}`" alt="" />
                <div class="ms-3">
                  <p class="product-name">{{ product.title }}</p>
                  <p class="product-sku">{{ product.sku }}</p>
                </div>
              </td>
              <td class="product-price">{{ product.price }}$</td>
              <td>
                <input-number
                  :productCount="product.count"
                  @update:productCount="updateCart(index, $event)"
                />
              </td>
              <td class="total-amount text-center">
                {{ Math.round(product.count * product.price) }}$
                <i class="bi bi-trash-fill" @click="deleteProduct(index)"></i>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="col-4">
        <div>
          <span class="fw-bold fs-4">Order</span>
          <div class="d-flex justify-content-between">
            <span class="fw-semibold">total order value</span>
            <span class="text-danger fw-bold fs-4">{{ getTotalAmount }}$</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from "@/components/InputNumber.vue";
export default {
  components: { InputNumber },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    updateCart(index, newCount) {
      this.data[index].count = newCount;
      localStorage.setItem("cart", JSON.stringify(this.data));
    },
    deleteProduct(index) {
      this.data.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.data));
      //
      const cartNumber = document.querySelector(".number");
      if (cartNumber) {
        cartNumber.innerText = this.data.length;
      }
    },
  },
  computed: {
    getCartNumber() {
      // Kiểm tra nếu this.data không phải là null hoặc undefined và có độ dài lớn hơn 0
      return this.data && this.data.length
        ? this.data.reduce((total, currentValue) => {
            return total + currentValue.count;
          }, 0)
        : 0; // Nếu this.data là null hoặc rỗng, trả về 0
    },
    getTotalAmount() {
      // Kiểm tra nếu this.data không phải là null hoặc undefined và có độ dài lớn hơn 0
      return this.data && this.data.length
        ? this.data.reduce((total, currentValue) => {
            return Math.round(total + currentValue.count * currentValue.price);
          }, 0)
        : 0; // Nếu this.data là null hoặc rỗng, trả về 0
    },
  },

  mounted() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.data = cart;
    const cartNumber = document.querySelector(".number");
    if (cartNumber) {
      cartNumber.innerText = cart.length;
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  padding: 1rem 0;
}
td img {
  width: 90px;
  height: 120px;
  object-fit: contain;
}
.product-name {
  font-size: 0.9rem;
}
.product-sku {
  font-size: 0.8rem;
  font-weight: bold;
}
.product-price {
  color: var(--hover-text);
  font-size: 0.9rem;
  font-weight: 600;
}
.total-amount {
  font-weight: bold;
}
</style>
