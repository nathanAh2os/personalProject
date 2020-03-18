<template>
  <v-container>
    <div class="mt-12">
      <v-row class="text-center">
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <v-row class="text-center">
            <h1>Login</h1>
          </v-row>
          <v-row class="text-center">
            <v-text-field label="Email" v-model="email"></v-text-field>
          </v-row>
          <v-row class="text-center">
            <v-text-field label="Username" v-model="username"></v-text-field>
          </v-row>
          <v-row class="text-center">
            <v-text-field
              label="Password"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text': 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-row>
          <v-row class="text-center">
            <v-btn left tile @click="createNewAccount">New User?</v-btn>
            <v-btn right @click="authenticateLogin">
              <v-icon>mdi-login-variant</v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
    </div>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
//import fb from "@/firebase/initFirebase";
import { store } from "../store";

export default {
  name: "login",
  data() {
    return {
      show1: false,
      email: "",
      username: "",
      password: "",
      snackbar: {
        show: false,
        text: "",
        color: "",
        timeout: 5000
      }
    };
  },
  created() {
    store.state.showSignOut = false;
  },
  methods: {
    authenticateLogin() {
      console.log("calling authenticateLogin() !");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(currentUser => {
          currentUser.displayName = this.username;
          store.state.currentUser = currentUser.displayName;
          this.$router.push("homepage");
        })
        .catch(error => {
          console.log(error.code);
          console.log(error.message);
          this.snackbar.show = true;
          this.snackbar.color = "red";
          this.snackbar.text =
            "Wrong email format, password, or connection stopped. Authentication failed!.";
        });
    },
    createNewAccount() {
      this.$router.push("newAccount");
    }
  }
};
</script>

<style>
.headerOne {
  font-size: 12px;
}
</style>