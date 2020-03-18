<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="6">
          <v-row>
            <h1>Record a game</h1>
          </v-row>
          <!-- Enabled/disabled Round Title/Round Buttons-->
          <v-row class="mt-2 mb-2">
            <v-btn v-if="roundsIndex > 0" small @click="roundsIndex--">
              <v-icon>mdi-menu-left</v-icon>
            </v-btn>
            <v-btn v-else disabled small @click="roundsIndex--">
              <v-icon>mdi-menu-left</v-icon>
            </v-btn>
            <v-btn small depressed>Round: {{rounds[roundsIndex]}} {{roundsType[roundsIndex]}}</v-btn>
            <v-btn v-if="roundsIndex < rounds.length -1" small @click="roundsIndex++">
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
            <v-btn v-else disabled small @click="roundsIndex++">
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
          </v-row>
          <!-- Enabled/disabled Level Title/Level Buttons-->
          <v-row class="mt-2 mb-2">
            <v-btn v-if="levelsIndex > 0" small @click="levelsIndex--">
              <v-icon>mdi-menu-left</v-icon>
            </v-btn>
            <v-btn v-else disabled small @click="levelsIndex--">
              <v-icon>mdi-menu-left</v-icon>
            </v-btn>
            <v-btn small depressed>Level: {{levels[levelsIndex]}}</v-btn>
            <v-btn v-if="levelsIndex < levels.length -1" small @click="levelsIndex++">
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
            <v-btn v-else disabled small @click="levelsIndex++">
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
          </v-row>
          <!-- Disabled Textfields -->
          <div v-if="roundsType[roundsIndex] === 'Carousel'">
            <v-row>
              <v-icon>mdi-heart</v-icon>
              <v-text-field disabled label="Health" v-model="health"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field disabled v-model="goldAmount" label="Gold Amount"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field disabled v-model="goldIncome" label="Gold Income"></v-text-field>
            </v-row>
          </div>
          <!-- Enabled Textfields -->
          <div v-else>
            <v-row>
              <v-icon>mdi-heart</v-icon>
              <v-text-field
                label="Health"
                v-model="health"
                persistent-hint
                hint="*Record at end of round"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="goldAmount"
                label="Gold Amount"
                persistent-hint
                hint="*Record at beginning of fight"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="goldIncome"
                label="Gold Income"
                persistent-hint
                hint="*Record at beginning of round"
              ></v-text-field>
            </v-row>
          </div>
          <!-- Submit OR -->
          <div v-if="!gameDone">
            <v-row>
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-btn @click="submitClicked">Submit</v-btn>
              </v-col>
            </v-row>
          </div>
          <!-- Game Has Ended -->
          <div v-else>
            <v-row>
              <v-text-field label="Placement" v-model="placement"></v-text-field>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="finalizeGameData">Finalize Game Data</v-btn>
              </v-col>
            </v-row>
          </div>
          <v-col cols="4"></v-col>
        </v-col>
      </v-row>
    </div>
    <!-- Graph Information -->
    <v-row class="graphRow">
      <v-col cols="12">
        <GChart type="LineChart" :data="chartData" :options="chartOptions" :events="chartEvents" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import firebase from "firebase/app";
import fb from "@/firebase/initFirebase";
import { store } from "../store";

export default {
  name: "homepage",
  data() {
    return {
      placement: "",
      roundsIndex: 0,
      levelsIndex: 0,
      gameDone: false,
      rounds: [
        1.1,
        1.2,
        1.3,
        1.4,
        2.1,
        2.2,
        2.3,
        2.4,
        2.5,
        2.6,
        2.7,
        3.1,
        3.2,
        3.3,
        3.4,
        3.5,
        3.6,
        3.7,
        4.1,
        4.2,
        4.3,
        4.4,
        4.5,
        4.6,
        4.7,
        5.1,
        5.2,
        5.3,
        5.4,
        5.5,
        5.6,
        5.7,
        6.1,
        6.2,
        6.3,
        6.4,
        6.5,
        6.6,
        6.7,
        7.1,
        7.2,
        7.3,
        7.4,
        7.5,
        7.6,
        7.7
      ],
      roundsType: [
        "Carousel",
        "Minions",
        "Minions",
        "Minions",
        "Battle",
        "Battle",
        "Battle",
        "Carousel",
        "Battle",
        "Battle",
        "Krugs",
        "Battle",
        "Battle",
        "Battle",
        "Carousel",
        "Battle",
        "Battle",
        "Wolves",
        "Battle",
        "Battle",
        "Battle",
        "Carousel",
        "Battle",
        "Battle",
        "Raptors",
        "Battle",
        "Battle",
        "Battle",
        "Carousel",
        "Battle",
        "Battle",
        "Dragon",
        "Battle",
        "Battle",
        "Battle",
        "Carousel",
        "Battle",
        "Battle",
        "Rift Herald OR Elder Dragon",
        "Battle",
        "Battle",
        "Battle",
        "Carousel",
        "Battle",
        "Battle",
        "Elder Dragon"
      ],
      health: 100,
      levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      goldAmount: null,
      goldIncome: null,
      gameData: [{ health: 100, level: 1, gold: 0 }],
      chartData: [
        ["Rounds", "Level", "Health", "Gold Amount", "Gold Income"],
        ["", 1, 100, 0, 0]
      ],
      chartOptions: {
        chart: {
          title: "TFT Game Stastitics",
          subtitle: ""
        }
      },
      chartEvents: {
        select: () => {
          // handle event here
        }
      }
    };
  },
  created() {
    store.state.showSignOut = true;
    store.state.showMenu = true;
  },
  computed: {
    currentUser: function() {
      return store.state.currentUser;
    },
    carousel: function() {
      if (this.roundsType[this.roundsIndex] === "Carousel") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    submitClicked() {
      this.chartData.push([
        this.roundsIndex,
        this.levels[this.levelsIndex],
        this.health,
        this.goldAmount,
        this.goldIncome
      ]);
      this.roundsIndex++;
      if (this.health == 0) {
        console.log("you have died!");
        this.gameDone = true;
      }
    },
    //This is where we will actually push all the info to our firebase
    finalizeGameData() {
      //Nested object that gets eventually converted to a map in firebase
      let recordedGameDataObj = {};
      let counter = 0;
      console.log(this.chartData);
      this.chartData.forEach(round => {
        console.log(round);
        if (counter === 0) {
          //Do nothing
        } else {
          recordedGameDataObj[this.rounds[counter]] = {
            level: round[1],
            health: round[2],
            goldAmount: round[3],
            goldIncome: round[4]
          };
        }
        counter++;
      });

      fb.collection("RecordedGameData")
        .add({
          placement: this.placement,
          history: recordedGameDataObj
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef);
        })
        .catch(err => {
          this.$emit("error", err);
        });

      counter++;
      console.log(recordedGameDataObj);
    }
  }
};
</script>

<style scoped>
</style>