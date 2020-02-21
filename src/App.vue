<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <h1 class="display-1 font-weight-bold ml-4 mt-2">TFT Tracker</h1>
      <p class="headerOne ml-4 mt-6">By Nathan Watters</p>
      <div v-if="showSignOut">
        <v-btn color="blue" right @click="signOut" small class="pa-1">Sign Out</v-btn>
      </div>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import { store } from "./store";

export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    showSignOut: function() {
      console.log("showSignOut computed called!");
      console.log(store.state.showSignOut);
      return store.state.showSignOut;
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(currentUser => {
          currentUser = firebase.auth().currentUser;
          store.state.currentUser = currentUser;
          // Sign-out successful.
          this.$router.push("/");
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
