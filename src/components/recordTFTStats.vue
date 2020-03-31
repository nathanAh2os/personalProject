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
            <v-btn small depressed>Round: {{rounds[roundsIndex]}} {{roundsType[roundsIndex]}}</v-btn>
          </v-row>
          <!-- Enabled/disabled Level Title/Level Buttons-->
          <v-row class="mt-2 mb-2">
            <v-btn v-if="levelsIndex > 3 && rounds[roundsIndex] > 1.3" small @click="levelsIndex--">
              <v-icon>mdi-menu-left</v-icon>
            </v-btn>
            <v-btn v-else disabled small @click="levelsIndex--">
              <v-icon>mdi-menu-left</v-icon>
            </v-btn>
            <v-btn small depressed>Level: {{levels[levelsIndex]}}</v-btn>
            <v-btn
              v-if="levelsIndex < levels.length -1 && roundsIndex > 2"
              small
              @click="levelsIndex++"
            >
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
            <v-btn v-else disabled small>
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
          </v-row>
          <!-- Disabled Textfields -->
          <div v-if="roundsType[roundsIndex] === 'Carousel' || rounds[roundsIndex] === 1.2">
            <v-row>
              <v-icon>mdi-heart</v-icon>
              <v-text-field
                disabled
                label="Health"
                v-model="health"
                persistent-hint
                hint="*Nothing to record during this round"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                disabled
                v-model="goldAmount"
                label="Gold Amount"
                persistent-hint
                hint="*Nothing to record during this round"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                disabled
                v-model="goldSpent"
                label="Gold Spent"
                persistent-hint
                hint="*Nothing to record during this round"
              ></v-text-field>
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
                hint="*Record at end of round"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="goldSpent"
                label="Gold Spent"
                persistent-hint
                hint="*Record at end of round"
              ></v-text-field>
            </v-row>
          </div>
          <!-- Submit, Game is still ongoing-->
          <div v-if="!gameDone">
            <v-row>
              <v-col v-if="roundsIndex > 0">
                <v-btn @click="roundsIndex--">Back</v-btn>
              </v-col>
              <v-col v-else>
                <v-btn disabled>Back</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn @click="submitClicked">Submit</v-btn>
              </v-col>
              <v-col v-if="roundsIndex > 32">
                <v-btn color="error" @click="gameDone = true">Last Man Standing?</v-btn>
              </v-col>
            </v-row>
          </div>
          <!-- Game Has Ended -->
          <div v-else>
            <v-row>
              <v-text-field label="Placement" v-model="placement" :rules="[rules.required]"></v-text-field>
            </v-row>
            <v-row>
              <v-btn @click="gameDone = false">Back</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="finalizeGameData">Finalize Game Data</v-btn>
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
      rules: {
        required: value => !!value || "Required."
      },
      placement: "",
      roundsIndex: 0,
      levelsIndex: 0,
      gameDone: false,
      averageGoldSpent: null,
      averageGoldAmount: null,
      economyHistory: [],
      health: 100,
      levels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      goldAmount: 2,
      goldSpent: 0,
      chartData: [
        ["Rounds", "Level", "Health", "Gold Amount", "Gold Spent"],
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
    //Make sure appropriate components are rendered
    store.state.showSignOut = true;
    store.state.showMenu = true;
  },
  computed: {
    currentUser: function() {
      return store.state.currentUser;
    },
    rounds: function() {
      return store.state.rounds;
    },
    roundsType: function() {
      return store.state.roundsType;
    }
  },
  methods: {
    submitClicked() {
      //Push our recorded data to the chart data so we will see the chart reactively update
      this.goldAmount = parseFloat(this.goldAmount);
      this.goldSpent = parseFloat(this.goldSpent);
      this.chartData.push([
        this.roundsIndex,
        this.levels[this.levelsIndex],
        this.health,
        this.goldAmount,
        this.goldSpent
      ]);
      this.roundsIndex++;
      //Record auto-level for first 3 rounds
      if (this.roundsIndex < 3) {
        this.levelsIndex = this.roundsIndex;
      }

      if (this.health == 0) {
        this.gameDone = true;
      }
    },
    finalizeGameData() {
      //We make a temporary object so that when we push to the firebase, it gets stored in the format we want
      let recordedGameDataObj = {};
      let counter = 0;
      if (!this.placement) {
        return;
      }
      //Give the object every round with its corresponding data
      this.chartData.forEach(round => {
        if (counter === 0) {
          //Do nothing
        } else {
          recordedGameDataObj[this.rounds[counter]] = {
            level: round[1],
            health: round[2],
            goldAmount: round[3],
            goldSpent: round[4]
          };
          this.economyHistory.push(round[3]);
        }
        counter++;
      });
      //Push appropriate data into firebase
      fb.collection("RecordedGameData")
        .add({
          placement: this.placement,
          economyHistory: this.economyHistory,
          history: recordedGameDataObj
        })
        .then(() => {
          //Reset values
          this.startAnotherGame();
        })
        .catch(err => {
          this.$emit("error", err);
        });
    },
    startAnotherGame() {
      this.gameDone = false;
      this.levelsIndex = 0;
      this.placement = null;
      this.roundsIndex = 0;
      this.chartData = [
        ["Rounds", "Level", "Health", "Gold Amount", "Gold Spent"],
        ["", 1, 100, 0, 0]
      ];
    }
  }
};
</script>

<style scoped>
</style>