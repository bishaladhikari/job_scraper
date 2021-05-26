<template>
  <v-app id="loginpage">
    <v-main>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-text-field
                clearable
                outlined
                label="E-mail"
                placeholder="..."
                type="text"
                id="email"
                v-model="email"
                prepend-icon="mdi-account"
            />
            <v-text-field
                clearable
                outlined
                label="Password"
                placeholder="..."
                type="password"
                id="password"
                v-model="password"
                prepend-icon="mdi-lock"
                @keyup.enter="login()"
            />
            <v-btn @click.prevent="login()">Login</v-btn>
            <p v-show="inval" class="error--text">Invalid username/password!</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/app";

require("firebase/auth");

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    inval: false
  }),
  methods: {
    login() {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
              user => {
                this.$router.push({name: "scrape-index"});
              },
              // eslint-disable-next-line
              err => {
                this.inval = true;
              }
          );
    }
  }
};
</script>

<style scoped>
h1 {
  color: #fafafa;
  margin: 25px;
}

div {
  text-align: center;
}

#login {
  margin-top: 10%;
}
</style>
