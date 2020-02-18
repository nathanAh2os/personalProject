<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to TFT Tracker</h1>

        <p class="subheading font-weight-regular">By Nathan Antler Watters</p>
        <p class="subheading font-weight-regular">Powered by Vuetify!</p>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <v-row class="text-center">
          <v-text-field label="Email" v-model="email" :rules="[rules.required]"></v-text-field>
        </v-row>
                <v-row class="text-center">
          <v-text-field label="Username" v-model="username" :rules="[rules.required]"></v-text-field>
        </v-row>
        <v-row class="text-center">
          <v-text-field
            label="Password"
            v-model="passwordOne"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text': 'password'"
            hint="At least 8 characters..."
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-row>
        <v-row class="text-center">
          <v-text-field
            label="Confirm Password"
            v-model="passwordTwo"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-row>
        <v-row class="text-center">
          <v-btn left tile @click="cancelClicked">Cancel</v-btn>
          <v-btn right v-on:keydown.enter="addAccountClicked" @click="addAccountClicked">
            <v-icon>mdi-login-variant</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import fb from "@/firebase/initFirebase";

export default {
  name: "newAccount",
  data() {
    return {
      username: "",
      show1: false,
      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () =>
          this.passwordOne === this.passwordTwo ||
          "Your confirmed password does not match!"
      },
      email: "",
      passwordOne: "",
      passwordTwo: "",
      passwordMatched: false
    };
  },
  methods: {
    cancelClicked() {
      console.log("cancelClicked()!");
      this.$router.go(-1);
    },
    addAccountClicked() {
      console.log("addAccountClicked()!");
      console.log(this.username);
      this.confirmPassword();

      if (this.passwordMatched && this.email) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.passwordOne)
          .then(function() {
            firebase.auth().currentUser.displayName = this.username;
            this.$router.push("login");
            fb.collection("users").add({
              Email: this.email,
              Username: this.username,
              Password: this.passwordOne
            });
          })
          .catch(function(error) {
            console.log(error.code);
            console.log(error.message);
          });
      }
    },
    confirmPassword() {
      if (this.passwordOne === this.passwordTwo) {
        this.passwordMatched = true;
      } else {
        this.passwordMatched = false;
      }
    }
  }
};
</script>