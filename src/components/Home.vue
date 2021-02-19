<template>
  <div>
    <h1>Quiz</h1>
    <div id="form">
      <div>
        <sui-input ref="nbQuestions" placeholder="Number of questions" type="text" name="nbQuestions" v-model="nbQuestions"></sui-input>
      </div>
      <div>
        <sui-dropdown
            :options="categories"
            placeholder="Choose a category"
            selection
            v-model="category">
        </sui-dropdown>
      </div>
      <sui-button @click="getData">
        Let's go !
      </sui-button>
    </div>
      <div v-if="questions.length !== 0">
        <p>{{ questions[currentQuestion].category }}</p>
        <p>{{ questions[currentQuestion].type }}</p>
        <p>{{ questions[currentQuestion].difficulty }}</p>
        <p>{{ questions[currentQuestion].question }}</p>
        <p>{{ questions[currentQuestion].correct_answer }}</p>
        <p>{{ questions[currentQuestion].incorrect_answers }}</p>
      </div>
    <sui-button @click="nextQuestion">Next</sui-button>
  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      nbQuestions: 0,
      categories: [
        {
          key: 0,
          value: 0,
          text: 'All'
        }
      ],
      category: '0',
      questions: [],
      currentQuestion: 0,
    }
  },

  methods: {
    getData() {
      this.questions = [];
      const url = this.category === 0 ? 'https://opentdb.com/api.php?amount=' + this.nbQuestions : 'https://opentdb.com/api.php?amount=' + this.nbQuestions + '&category=' + this.category;
      axios.get(url)
          .then(response => {
            for (let question of response.data.results) {
              this.questions.push(question);
            }
          })
    },
    nextQuestion() {
      this.currentQuestion = this.currentQuestion <= this.nbQuestions ? this.currentQuestion+1 : this.currentQuestion;
    }
  },

  mounted() {
    axios.get('https://opentdb.com/api_category.php')
        .then(response => {
          for (let category of response.data.trivia_categories) {
            this.categories.push({
              key: category.id,
              value: category.id,
              text: category.name
            });
          }
        })
  }
}
</script>
