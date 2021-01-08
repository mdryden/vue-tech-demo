<template>
  <div class="login">
    <h1>Log in to your account</h1>
    <section id="loginForm">
      <form ref="form" @submit.prevent="login">
        <div>
          <input
            id="email"
            type="text"
            v-model="email"
            placeholder="Email"
            autocomplete="email"
            required
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Password"
            autocomplete="current-password"
            required
          />
        </div>
        <div>
          <button id="submit" type="submit" class="">
            Log in
          </button>
        </div>
      </form>
    </section>

    <p class="text-center">
      Not signed up yet?
      <router-link to="/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import { auth } from "../../modules/firebase";

export default {
  name: "login",
  props: {
    returnUrl: String,
  },
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        let user = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );

        let target = this.returnUrl || "/";

        this.$router.replace(target);
      } catch (exception) {
        console.error(exception.message);
        alert(exception.message);
      }
    },
  },
  submit() {
    if (this.$refs.form.checkValidity()) {
      this.login();
    } else {
      this.$refs.form.reportValidity();
    }
  },
};
</script>
