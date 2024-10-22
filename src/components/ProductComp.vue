<template>
  <div class="product-detail">
    <div class="product-detail__top">
      <img
        :src="`${product.thumbnail}`"
        :alt="product.title"
        class="img-fluid"
      />
      <p class="availabilityStatus">{{ product.availabilityStatus }}</p>
    </div>
    <div class="product-detail__body">
      <span class="product-title"> {{ product.title }}</span>
      <p class="product-rated">
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>

        {{ product.rating }}
      </p>
      <p class="product-price">{{ product.price }}$</p>
      <p class="product-warranty">{{ product.warrantyInformation }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: { product: Object },
};
</script>

<style scoped>
.product-detail {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  padding: 12px;
  height: 100%;
  background: #f7f7f7;
}

.product-detail .product-price {
  color: var(--hover-text);
  font-weight: 500;
}
.product-detail .product-detail__top {
  position: relative;
}
.product-detail .product-detail__top .availabilityStatus {
  position: absolute;
  top: 0;
  padding: 2px 4px;
  background-color: var(--highlight-red);
  color: #fff;
  font-weight: 500;
  border-radius: 4px;
}
.product-detail .product-detail__top:hover img {
  transform: scale(1.05);
  cursor: pointer;
  transition: transform 0.7s ease;
}
</style>
