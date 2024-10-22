<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-12 col-lg-8 col-xl-6 offset-xl-1">
          <form @submit.prevent="onSubmit">
            <!-- Email input -->
            <div data-mdb-input-init class="form-outline mb-4">
              <label class="form-label" for="form3Example3">Email</label>
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Enter a valid email address"
                v-model="email"
              />
            </div>

            <!-- Password input -->
            <div data-mdb-input-init class="form-outline mb-3">
              <label class="form-label" for="form3Example4">Password</label>
              <input
                type="password"
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Enter password"
                v-model="password"
              />
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
              >
                Login
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account?
                <router-link to="/signup" class="router-link link-danger">
                  Register</router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
      <!-- Toast -->
      <Toast v-if="isShowToast" :content="`Login Success`" :type="'success'" />
      <Toast v-if="isLoginError" :content="`Login Failed`" :type="'error'" />
    </div>
  </section>
</template>

<script>
import ToastNotification from "@/components/ToastNotification.vue";
export default {
  components: { Toast: ToastNotification },
  data() {
    return {
      email: null,
      password: null,
      userLocal: null,
      isShowToast: false,
      isLoginError: false,
    };
  },
  methods: {
    onSubmit() {
      if (
        this.email === this.userLocal.email &&
        this.password === this.userLocal.password
      ) {
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({ email: this.email, password: this.password })
        );
        this.isShowToast = true;
        setTimeout(() => {
          this.$router.push("/");
          this.isShowToast = false;
        }, 2000);
      } else {
        this.isLoginError = true;
        setTimeout(() => {
          this.isLoginError = false;
        }, 2000);
      }
    },
  },
  mounted() {
    this.userLocal = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<style scoped>
.container-fluid {
  position: relative;
}
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
