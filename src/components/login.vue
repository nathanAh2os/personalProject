<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <v-row>
        <h1 class="display-1 font-weight-bold ml-4 mt-2">TFT Tracker</h1>
        <p class="headerOne ml-4 mt-6">By Nathan Antler Watters</p>
      </v-row>
    </v-app-bar>
    <div class="mt-12">
      <v-row class="text-center">
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <v-row class="text-center">
            <v-text-field label="Email" v-model="email"></v-text-field>
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
            <v-btn right v-on:keydown.enter="authenticateLogin" @click="authenticateLogin">
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

export default {
  name: "login",
  data() {
    return {
      show1: false,
      email: "",
      username: "",
      password: "",
      currentUser: null,
      snackbar: {
        show: false,
        text: "",
        color: "",
        timeout: 5000
      }
    };
  },
  created() {
    console.log("created lifecycle!");
    //Temporary until I add a signout option in the homepage
  },
  methods: {
    authenticateLogin() {
      console.log("calling authenticateLogin() !");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(currentUser => {
          currentUser = firebase.auth().currentUser;
          this.currentUser = currentUser;
          console.log("Successfully authenticated user!");
          this.$router.push("homepage");
        })
        .catch(error => {
          console.log(error.code);
          console.log(error.message);
          this.snackbar.show = true;
          this.snackbar.color = "red";
          this.snackbar.text =
            "Wrong Email, password, or connection stopped. Authentication failed!.";
        });
    },
    createNewAccount() {
      this.$router.push("newAccount");
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          this.$router.push("login");
        })
        .catch(error => {
          // An error happened.
          console.log(error.code);
          console.log(error.message);
        });
    }
  }
};
</script>

<style>
.headerOne {
  font-size: 12px;
}
</style>