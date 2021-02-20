<template>
  <div>
    <sui-grid class="centered">
      <sui-container>
        <h1 is="sui-header">Start a quiz</h1>
        <sui-grid class="centered">

          <sui-divider/>
          <sui-grid-row :columns="2">
            <sui-grid-column class="right aligned" :width="4">
              Choose a number of questions
            </sui-grid-column>
            <sui-grid-column :width="4">
              <sui-input fluid ref="nbQuestions" placeholder="Number of questions" type="number" name="nbQuestions"
                         v-model="nbQuestions"></sui-input>
            </sui-grid-column>
          </sui-grid-row>

          <sui-grid-row :columns="2">
            <sui-grid-column class="right aligned" :width="4">
              Choose a category
            </sui-grid-column>
            <sui-grid-column :width="4">
              <sui-dropdown fluid :options="categories" :placeholder="categories[0].text" selection v-model="category">
              </sui-dropdown>
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
      nbQuestions: 10,
      categories: [
        {
          key: 0,
          value: 0,
          text: 'All'
        }
      ],
      category: 0,
    }
  },

  mounted() {
    axios.get('https://opentdb.com/api_category.php')
        .then(response => {
          for (let category of response.data.trivia_categories) {
            axios.get('https://opentdb.com/api_count.php?category=' + category.id)
                .then(r =>{
                  this.categories.push({
                    key: category.id,
                    value: category.id,
                    text: category.name,
                    number: r.data.category_question_count.total_question_count
                  });

                })
          }
        })
  }
}
</script>

<style>


</style>
