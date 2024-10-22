<template>
  <div class="setting">
    <router-link to="/cart" class="router-link">
      <div class="cart">
        <i class="bi bi-cart2"></i>
        <div class="number">2</div>
      </div></router-link
    >
    <div class="account" v-if="!isLogin">
      <router-link to="/signup" class="router-link">
        <i class="bi bi-person-circle"></i
      ></router-link>
    </div>
    <div v-else class="menu">
      <i class="bi bi-person-circle"></i>
      <ul class="menu-dropdown bg-light p-3">
        <li>Hi {{ currentUser.email }}</li>
        <li>Account</li>
        <li @click="signOut">Sign out</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      currentUser: {},
    };
  },
  methods: {
    signOut() {
      sessionStorage.clear();
      this.isLogin = false;
      this.$router.push("/");
    },
  },
  mounted() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log("User from sessionStorage:", user); // Kiểm tra thông tin người dùng

    if (user) {
      this.isLogin = true;
      this.currentUser = user; // Lưu thông tin người dùng
    }

    console.log("Is login state:", this.isLogin); // Kiểm tra giá trị isLogin
  },
  watch: {
    $route(newValue, oldValue) {
      console.log(newValue, oldValue);

      const user = JSON.parse(sessionStorage.getItem("currentUser"));
      this.isLogin = !!user; // Cập nhật trạng thái isLogin
      if (user) {
        this.currentUser = user; // Lưu thông tin người dùng
      }
    },
  },
};
</script>

<style lang="css" scoped>
.cart {
  position: relative;
}

.number {
  position: absolute;
  /* padding: 2px 4px; */
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--highlight-red);
  color: #fff;
  font-size: 0.8rem;
  border-radius: 50%;
  top: 1.2rem;
  left: 0.5rem;
}

.menu {
  position: relative;
}

.menu:hover .menu-dropdown {
  display: block;
}
.menu-dropdown {
  position: absolute;
  list-style-type: none;
  right: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  display: none;
  z-index: 1000;
}

.menu-dropdown li {
  font-weight: 500;
  padding: 0.3rem 0;
}

.menu-dropdown li:hover {
  color: var(--hover-text);
  cursor: pointer;
}
</style>
