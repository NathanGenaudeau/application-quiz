<template>
  <div>
    <sui-grid class="centered">
      <sui-container>
        <h1 is="sui-header">Start a quiz</h1>
        <sui-grid class="centered">

          <sui-grid-row :columns="2">
            <sui-grid-column class="aligned" :width="4">
              Choose a number of questions
            </sui-grid-column>
            <sui-grid-column :width="4">
              <sui-input ref="nbQuestions" placeholder="Number of questions" type="number" name="nbQuestions" v-model="nbQuestions"></sui-input>
            </sui-grid-column>
          </sui-grid-row>

          <sui-grid-row :columns="2">
            <sui-grid-column class="aligned" :width="4">
              Choose a category
            </sui-grid-column>
            <sui-grid-column :width="4">
              <sui-dropdown :options="categories" placeholder="Category" selection v-model="category"></sui-dropdown>
            </sui-grid-column>
          </sui-grid-row>

          <sui-grid-row :columns="1">
            <sui-grid-column :width="2">
              <router-link :to="{ name: 'Quiz', params: { nbQuestions, category } }">
                <sui-button color="green">
                  Let's go !
                </sui-button>
              </router-link>
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
      nbQuestions: '',
      categories: [
        {
          key: 0,
          value: 0,
          text: 'All'
        }
      ],
      category: '',
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

<style>
</style>
