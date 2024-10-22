<template>
  <Suspense>
    <template #default>
      <div class="container-fluid" v-if="data">
        <div class="director pt-3 mb-4">
          <router-link to="/" class="router-link">Home</router-link> |
          <span class="router-link" @click="$router.back()">
            {{ data.category }}
          </span>
          | {{ data.title }}
        </div>

        <div class="row">
          <div class="col-7">
            <ProductImage :data="data" />
          </div>
          <div class="col-5">
            <div>
              <p class="product-name">
                {{ data.title }}
              </p>
              <p class="product-sku">SKU: {{ data.sku }}</p>
              <div class="d-flex justify-content-between">
                <span class="product-price">{{ data.price }}$</span>
                <span class="product-availabilityStatus">
                  {{ data.availabilityStatus }}: {{ data.stock }}
                </span>
              </div>
              <p class="product-discountPercentage">
                Discount {{ data.discountPercentage }} %
              </p>
              <p class="detail">PRODUCT DETAIL</p>
              <ul>
                <li class="product-rating">Brand: "Chic Cosmetics"</li>
                <li class="product-rating">Rating: {{ data.rating }}</li>
                <li class="product-warranty">
                  Warranty: {{ data.warrantyInformation }}
                </li>
                <li class="product-shipping">
                  Shipping information: {{ data.shippingInformation }}
                </li>
                <li class="product-policy">Product policy: 30 day return</li>
                <li class="product-description">
                  Product description: {{ data.description }}
                </li>
              </ul>
            </div>
            <div class="mb-3 select-number">
              <span class="choose-quantity">Choose quantity</span>
              <button
                class="decrement"
                @click="quantity--"
                :class="{ disableButton: quantity < 2 }"
                :disabled="quantity < 2"
              >
                -
              </button>
              <input type="text" value="1" v-model="quantity" id="quantity" />
              <button class="increment" @click="quantity++">+</button>
            </div>
            <button class="btn btn-primary text-center" @click="addCart">
              <i class="bi bi-cart3 fs-5"></i>Thêm vào giỏ hàng
            </button>
            <!--  -->
            <ul class="product-reviews mt-5 ps-0" v-if="data.reviews">
              <span class="text-uppercase fs-3 fw-semibold d-block mb-5"
                >comments</span
              >
              <li
                class="review d-flex border-bottom border-secondary mb-4"
                v-for="(review, index) in data.reviews"
                :key="index"
              >
                <div class="account me-3">
                  <i class="bi bi-person-circle fs-2"></i>
                </div>
                <div class="review-info">
                  <h6 class="review-info-name">{{ review.reviewerName }}</h6>
                  <h6 class="review-info-email">{{ review.reviewerEmail }}</h6>
                  <span class="review-info-rating"
                    ><i
                      class="bi bi-star-fill text-warning"
                      v-for="(rate, index) in review.rating"
                      :key="index"
                    ></i
                  ></span>
                  <p class="review-content">
                    {{ review.comment }}
                  </p>
                  <p class="review-time">
                    Rate on: {{ new Date(review.date).toLocaleDateString() }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Toast Notification -->

        <Toast
          v-if="showToast"
          :content="`Added product to cart successfully`"
          :type="'success'"
        /></div
    ></template>
    <template #fallback> <div class="hello">123</div></template>
  </Suspense>
</template>

<script>
import { API_URL } from "@/config";
import ToastNotification from "@/components/ToastNotification.vue";
import ProductImage from "@/components/ProductImage.vue";

export default {
  components: {
    Toast: ToastNotification,
    ProductImage,
  },
  data() {
    return {
      data: null,
      cart: [],
      quantity: 1,
      showToast: false,
      toastTimeout: false,
    };
  },
  computed: {
    getProductId() {
      return this.$route.query.id;
    },
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        fetch(API_URL + `/${this.getProductId}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setTimeout(() => resolve(data), 2000); // Giả lập độ trễ
          })
          .catch((error) => {
            console.log(error);
            reject(error); // Reject Promise nếu có lỗi
          });
      });
    },
    addCart() {
      const product = this.cart.find(
        (item) => item.id === parseInt(this.getProductId)
      );
      if (product) {
        product.count += parseInt(this.quantity);
      } else {
        this.cart.push({
          id: parseInt(this.getProductId),
          count: parseInt(this.quantity),
          title: this.data.title,
          sku: this.data.sku,
          price: this.data.price,
          thumbnail: this.data.thumbnail,
        });
      }
      const cartNumber = document.querySelector(".number");
      cartNumber.innerText = this.cart.length;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }

      this.showToast = true;
      this.toastTimeout = setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
  },
  async created() {
    this.data = await this.fetchData(); // Gọi fetchData
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
.container,
.container-fluid {
  background-color: #f7f7f7;
  position: relative;
}
/* .director {
  margin: 2rem 0;
} */
.mini-image {
  margin-bottom: 1rem;
}
.product-name {
  font-size: 1.2rem;
  font-weight: bold;
}
.product-sku {
  color: #333;
}

.product-price {
  font-size: 1.5rem;
  color: var(--highlight-red);
  font-weight: bolder;
}

.product-availabilityStatus {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}
.product-discountPercentage {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--hover-text);
}
.detail {
  font-size: 1.5rem;
  font-weight: 500;
}
/*Swiper  */
.col-7 {
  height: 100%;
}

.router-link {
  font-weight: bold;
  text-transform: uppercase;
}
.select-number button {
  width: 40px;
  border: 1px solid #ccc;
  outline: none;
}

button.decrement {
  border-radius: 4px 0 0 4px;
}

button.decrement.disableButton {
  background-color: #bdc3c7; /* Màu nền cho button disabled */
  color: #7f8c8d; /* Màu chữ khi button bị disabled */
  cursor: not-allowed; /* Thay đổi con trỏ chuột thành không cho phép */
  opacity: 0.6; /* Giảm độ trong suốt để thể hiện trạng thái disabled */
}

button.increment {
  border-radius: 0 4px 4px 0;
}

.select-number input {
  width: 50px;
  border: 1px solid #ccc;
  outline: none;
  text-align: center;
}
.select-number input:focus {
  border: 2px solid var(--hover-text);
}
.choose-quantity {
  text-transform: uppercase;
  display: inline-block;
  font-weight: bold;
  margin-right: 2rem;
}
.hello {
  color: #000;
}
</style>
