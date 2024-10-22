<template>
  <button class="decrement" @click="handleDecrement" :disabled="count < 2">
    -
  </button>
  <input
    type="text"
    :v-model="count"
    :value="count"
    @input="updateCount($event.target.value)"
  />
  <button class="increment" @click="handleIncrement">+</button>
</template>

<script>
export default {
  props: { productCount: { type: Number, require: true } },
  data() {
    return {
      count: this.productCount,
    };
  },
  methods: {
    updateCount(newCount) {
      this.count = newCount;
      this.$emit("update:productCount", Number(newCount));
    },
    handleDecrement() {
      this.count--;
      this.updateCount(this.count);
    },
    handleIncrement() {
      this.count++;
      this.updateCount(this.count);
    },
  },
};
</script>

<style scoped>
button {
  width: 30px;
  border: 1px solid #ccc;
  outline: none;
}

button.decrement {
  border-radius: 4px 0 0 4px;
}

button.increment {
  border-radius: 0 4px 4px 0;
}

input {
  width: 40px;
  border: 1px solid #ccc;
  outline: none;
  text-align: center;
}
</style>
