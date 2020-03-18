<template>
  <v-container>
    <v-row class="topRow"></v-row>
    <v-row class="text-center">
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <v-row class="text-center">
          <h1>Create New Account</h1>
        </v-row>
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
//import { store } from "../store";

export default {
  name: "newAccount",
  data() {
    return {
      username: "",
      currentUser: "",
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
  created() {
    //this.store.state.showMenu = false;
    console.log("created lifecycle called!");
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
          .then(currentUser => {
            currentUser = firebase.auth().currentUser;
            currentUser.displayName = this.username;
            this.currentUser = currentUser;
            fb.collection("Users")
              .add({
                userid: this.currentUser.uid,
                name: this.username,
                email: this.email
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
            this.$router.push("login");
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

<style scoped>
.topRow {
  min-height: 50px;
}
</style>