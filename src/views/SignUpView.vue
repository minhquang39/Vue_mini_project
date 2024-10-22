<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form @submit.prevent="submitForm">
            <!-- Email input -->
            <div data-mdb-input-init class="form-outline mb-4">
              <label for="">Email</label>
              <input
                type="email"
                id="email"
                class="form-control form-control-lg"
                placeholder="Fill your email"
                v-model.trim="user.email"
                @input="handleEmail"
              />
              <p class="error">{{ error.email }}</p>
            </div>
            <!--  -->
            <div data-mdb-input-init class="form-outline mb-4">
              <label for="">Name</label>
              <input
                type="name"
                id="name"
                class="form-control form-control-lg"
                placeholder="Fill your name"
                v-model.trim="user.name"
                @input="handleName"
              />
              <p class="error">{{ error.name }}</p>
            </div>
            <!--  -->

            <!-- Password input -->
            <div data-mdb-input-init class="form-outline mb-3">
              <label for="">Password</label>
              <input
                type="password"
                id="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model.trim="user.password"
              />
            </div>
            <div data-mdb-input-init class="form-outline mb-3">
              <label for="">Confirm password</label>
              <input
                type="password"
                id="passwordConfirmation"
                class="form-control form-control-lg"
                placeholder="Password confirmation"
                v-model.trim="user.passwordConfirmation"
                @input="handlePassword"
              />
              <p class="error">{{ error.password }}</p>
            </div>

            <!--  -->

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
                type="submit"
              >
                Sign Up
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">
                Had an account?
                <router-link to="/login" class="link-danger">Login</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // name: null,
      // email: null,
      // password: null,
      // passwordConfirmation: null,
      user: {
        name: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      },
      error: {
        name: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    handleEmail() {
      const emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.user.email.length === 0) {
        this.error.email = "Email must not empty";
      } else if (!this.user.email.match(emailPattern)) {
        this.error.email = "Email not invalid";
      } else {
        this.error.email = "";
      }
    },
    handleName() {
      if (this.user.name.length === 0) {
        this.error.name = "Name must not empty";
      } else if (this.user.name.length < 4) {
        this.error.name = "Name must at least 4 characters";
      } else {
        this.error.name = "";
      }
    },
    handlePassword() {
      if (this.user.password !== this.user.passwordConfirmation) {
        this.error.password = "Passwords doesn't match";
      } else {
        this.error.password = "";
      }
    },
    submitForm() {
      if (!this.error.email && !this.error.name && !this.error.password) {
        console.log(this.user);

        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },
  },
};
</script>

<style scoped>
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
.form-outline .error {
  color: var(--highlight-red);
  font-weight: 600;
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
