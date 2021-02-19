<template>
  <div>
    <sui-grid class="centered">
      <sui-container>

        <sui-card class="blue centered" v-if="questions.length !== 0 && ((currentQuestion + 1) <= nbQuestions)">
          <sui-card-content>
            <sui-card-header>
              <div>
                <sui-label tag class="right floated">{{ questions[currentQuestion].difficulty }}</sui-label>
                <sui-label tag class="right floated">{{ questions[currentQuestion].category }}</sui-label>
              </div>
              <sui-divider hidden/>
              <sui-divider hidden/>
              <div>Question {{ currentQuestion + 1 }} / {{ nbQuestions }}</div>
            </sui-card-header>
          </sui-card-content>
          <sui-card-content>
            <sui-header size="tiny">{{ questions[currentQuestion].question }}</sui-header>
            <div>
              <sui-button v-bind:disabled="disableButton" @click="getResponse(questions[currentQuestion], answer); disableButtons()" v-for="answer in questions[currentQuestion].answers" v-bind:key="answer">{{ answer }}
              </sui-button>
            </div>
            <!-- end of base semantic ui, to be updated in the future with sui-feed -->
          </sui-card-content>
          <sui-card-content extra>
            <sui-button primary @click="nextQuestion">Next question</sui-button>
            <div v-if="end">
              {{ correctAnswers }} / {{ nbQuestions }} correct answers !
            </div>
          </sui-card-content>
        </sui-card>

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
      this.correctAnswers = question.correct_answer === response ? this.correctAnswers + 1 : this.correctAnswers;
    }
  },

  mounted() {
    this.questions = [];
    const url = this.category === 0 ? 'https://opentdb.com/api.php?amount=' + this.nbQuestions : 'https://opentdb.com/api.php?amount=' + this.nbQuestions + '&category=' + this.category;
    axios.get(url)
        .then(response => {
          for (let question of response.data.results) {

            let answers = question.incorrect_answers;
            answers.push(question.correct_answer);
            answers = this.shuffle(answers);

            this.questions.push({
              category: question.category,
              type: question.type,
              difficulty: question.difficulty,
              question: question.question,
              answers: answers,
              correct_answer: question.correct_answer
            });
          }
        })
  }
}

</script>

<style>

.card {
  min-width: 75%;
}

</style>
