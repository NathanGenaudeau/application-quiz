<template>
  <div>
    <sui-grid class="centered">
      <sui-container>
        <h1 is="sui-header">Start a quiz</h1>
        <sui-grid class="centered">
          <sui-divider/>

          <sui-grid-row :columns="2">
            <sui-grid-column class="right aligned" :width="4">
              <h3>Choose a number of questions (50 max)</h3>
            </sui-grid-column>
            <sui-grid-column :width="4">
              <sui-input fluid ref="nbQuestions" placeholder="Number" type="number" name="nbQuestions" v-model="nbQuestions" @input="testNumber"></sui-input>
              <sui-label v-if="notValidNumber" basic color="red" pointing>Number is too big or too small !</sui-label>
              <sui-label v-else-if="notEnoughQuestions" basic color="red" pointing>Not enough questions in this category !</sui-label>
            </sui-grid-column>
          </sui-grid-row>

          <sui-grid-row :columns="2">
            <sui-grid-column class="right aligned" :width="4">
              <h3>Choose a category</h3>
            </sui-grid-column>
            <sui-grid-column :width="4">
              <sui-dropdown fluid :loading="loaded" :options="categories" placeholder="Category" selection v-model="category">
              </sui-dropdown>
            </sui-grid-column>
          </sui-grid-row>

          <sui-grid-row :columns="1">
            <sui-grid-column :width="2">
                <sui-button :disabled="disableStart" @click="verify" fluid size="big" color="green">Start</sui-button>
            </sui-grid-column>
          </sui-grid-row>


        </sui-grid>
      </sui-container>
    </sui-grid>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Start",
  data() {
    return {
      nbQuestions: 10,
      categories: [],
      category: 0,
      error: false,
      loaded: true,
      notEnoughQuestions: false,
      notValidNumber: false,
      disableStart: false,
    }
  },

  methods: {
    verify() {
      const cat = this.categories.filter((c) => c.value === this.category)[0];
      if (cat.number > this.nbQuestions && this.nbQuestions < 50 && this.nbQuestions > 0) this.$router.push({name: 'Quiz', params: {nbQuestions: this.nbQuestions, category: this.category}})
    },

    testNumber() {
      const cat = this.categories.filter((c) => c.value === this.category)[0];
      if (this.nbQuestions > 50 || this.nbQuestions <= 0) {
        this.notValidNumber = true;
        this.disableStart = true;
      } else if (cat.number < this.nbQuestions) {
        this.notEnoughQuestions = true;
        this.disableStart = true;
      } else {
        this.notEnoughQuestions = false;
        this.disableStart = false;
        this.notValidNumber = false;
      }
    }
  },

  mounted() {
    axios.get('https://opentdb.com/api_count_global.php')
        .then(response => {
          this.categories.push({
            key: 0,
            value: 0,
            text: 'All',
            number: response.data.overall.total_num_of_verified_questions,
          });
        });

    axios.get('https://opentdb.com/api_category.php')
        .then(response => {
          for (let category of response.data.trivia_categories) {
            axios.get('https://opentdb.com/api_count.php?category=' + category.id)
                .then(r => {
                  this.categories.push({
                    value: category.id,
                    text: category.name,
                    number: r.data.category_question_count.total_question_count,
                  });

                });
          }
          this.categories.sort(function (a, b) {
            return a.value - b.value;
          });
          this.loaded = false;
        });
  }
}
</script>

<style scoped>

</style>
