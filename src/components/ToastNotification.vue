<template>
  <div class="toast d-flex p-3" :class="type">
    <div class="toast-icon me-3">
      <i
        :class="type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-x'"
      ></i>
    </div>
    <div class="toast-content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
    content: { type: String, required: true },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  animation: rightToLeft 0.7s linear;
}

.toast.success {
  background-color: #55b938;
}

.toast.error {
  background: #d65745;
}

@keyframes rightToLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
