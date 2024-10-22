<template>
  <div v-if="data">
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="mySwiper2"
    >
      <swiper-slide v-for="image in data.images" :key="image">
        <img :src="`${image}`" />
      </swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="1"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="image in data.images" :key="image">
        <img :src="`${image}`" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// Import các kiểu CSS cần thiết
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Import các module cần thiết
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import router from "@/router";
export default {
  props: { data: { type: [Object, Array, String, Promise], required: true } },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      thumbsSwiper: null, // Thumbs swiper được khởi tạo là null
      modules: [FreeMode, Navigation, Thumbs], // Các module sử dụng cho Swiper
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
  },
};
</script>

<style scoped>
/*Swiper  */
.col-7 {
  height: 100%;
}
.swiper {
  width: 100%;
  height: 300px !important;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: contain;
  background-position: center;
}

.mySwiper2 {
  /* height: 30% !important; */
  width: 100%;
}

.mySwiper {
  /* height: 70% !important;   */
  box-sizing: border-box;
  padding: 10px 0;
  height: 100px !important;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
