<template>
  <div class="login">
    <div class="">
      <h4>Log in to your account</h4>
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
          <button id="submit" type="submit">
            Log in
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
input,
button {
  margin: 0.5em;
}
button {
  display: block;
  width: 15em;
  padding-top: 0.5em;
  padding-bottom: 0.9em;
}
</style>
<script>
import { auth } from "../../modules/firebase";
export default {
  name: "login",
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
        this.$router.replace("/");
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
