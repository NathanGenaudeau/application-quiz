<template>
  <div>
    <sui-grid class="centered">
      <sui-container>

        <sui-card class="blue centered" v-if="questions.length !== 0 && ((currentQuestion + 1) <= nbQuestions)">
          <sui-card-content>
            <sui-card-header>
              <sui-label size="large" :color="questions[currentQuestion].color" class="left floated">{{ questions[currentQuestion].difficulty }}</sui-label>
              <sui-label size="large" color="blue" tag class="right floated">{{ questions[currentQuestion].category }}</sui-label>
              <sui-divider clearing hidden fitted/>
              <div>Question {{ currentQuestion + 1 }} / {{ nbQuestions }}</div>
            </sui-card-header>
          </sui-card-content>
          <sui-card-content>
            <sui-divider fitted hidden/>
            <sui-header>{{ questions[currentQuestion].question }}</sui-header>
            <sui-divider hidden/>

            <sui-grid class="centered" :columns="2" divided="vertically">
              <sui-grid-row>
                <sui-grid-column v-for="answer in questions[currentQuestion].answers" :key="answer">
                  <sui-button fluid v-bind:disabled="disableButton" @click="getResponse(questions[currentQuestion], answer); disableButtons()">{{ answer }}</sui-button>
                </sui-grid-column>
              </sui-grid-row>
            </sui-grid>
            <sui-message v-bind:positive="response" v-bind:negative="!response" v-if="result">{{ response }}</sui-message>
          </sui-card-content>
          <sui-card-content extra>
            <sui-button v-if="(currentQuestion + 1) < nbQuestions" size="big" primary @click="nextQuestion">Next question</sui-button>
            <router-link v-else :to="{name: 'Results', params: {correctAnswers, questions}}">
              <sui-button size="big" primary >View results</sui-button>
            </router-link>
          </sui-card-content>
        </sui-card>

        <!--<div v-if="end">
          {{ correctAnswers }} / {{ nbQuestions }} correct answers !
        </div>-->

      </sui-container>
    </sui-grid>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Quiz',
  data() {
    return {
      questions: [],
      currentQuestion: 0,
      correctAnswers: 0,
      end: false,
      disableButton: false,
      response: '',
      result: false,
    }
  },

  props: {
    nbQuestions: Number,
    category: Number
  },

  methods: {
    //Usage of the Fisher - Yates algorithm to shuffle answers : https://bost.ocks.org/mike/shuffle/
    shuffle(array) {
      let m = array.length, t, i;

      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    },

    nextQuestion() {
      this.result = false;
      if (this.currentQuestion + 1 < this.nbQuestions){
        this.currentQuestion++;
        this.disableButton = false;
      }
      else this.end = true;
    },

    disableButtons() {
      this.disableButton = true;
    },

    getResponse(question, response) {
      this.result = true;
      if (question.correct_answer === response){
        this.correctAnswers++;
        this.response = true;
      }
      else this.response = false;
    }
  },

  mounted() {
    this.questions = [];
    const url = this.category === 0 ? 'https://opentdb.com/api.php?amount=' + this.nbQuestions + '&encode=url3986' : 'https://opentdb.com/api.php?amount=' + this.nbQuestions + '&category=' + this.category + '&encode=url3986';
    axios.get(url)
        .then(response => {
          for (const question of response.data.results) {

            let answers = question.incorrect_answers;
            answers.push(question.correct_answer);
            answers = this.shuffle(answers);
            answers.forEach((o, i, a) => a[i] = decodeURIComponent(a[i]));

            const color = question.difficulty === "hard" ? "red" : question.difficulty === "medium" ? "orange" : "green";

            this.questions.push({
              category: decodeURIComponent(question.category),
              type: decodeURIComponent(question.type),
              difficulty: question.difficulty,
              question: decodeURIComponent(question.question),
              answers: answers,
              correct_answer: decodeURIComponent(question.correct_answer),
              color: color,
            });
          }
        })
  }
}

</script>

<style scoped>

.card {
  min-width: 75%;
}

.ui.fluid.button{
  height: 100px;
}

</style>
