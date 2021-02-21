<template>
  <div>
    <sui-grid class="centered">
      <sui-container>
        <h1 is="sui-header">Results : {{ correctAnswers }} / {{ questions.length }}</h1>
        <h2>{{((correctAnswers/questions.length)*100).toPrecision(2)}} % of correct answers !</h2>
        <h3 v-if="(correctAnswers/questions.length)*100 < 50">Not bad ! Congratulations, you will do better next time !</h3>
        <h3 v-else-if="(correctAnswers/questions.length)*100 >= 50 && (correctAnswers/questions.length)*100 < 99">Good ! Congratulations, you have a good culture !</h3>
        <h3 v-else-if="(correctAnswers/questions.length)*100 === 100">Perfect ! Congratulations, you are a culture freak !</h3>
        <sui-divider hidden/>
        <router-link to="start">
          <sui-button size="big" primary>New game</sui-button>
        </router-link>
        <sui-divider hidden/>
      </sui-container>
    </sui-grid>
    <sui-grid>
      <sui-container>
        <sui-divider/>
        <h1 is="sui-header" class="center aligned">Overview</h1>

        <sui-accordion fluid exclusive styled>
          <template v-for="question in questions">
          <sui-accordion-title :key="question.value">
            <sui-icon name="dropdown" />
            {{ question.question }}
            <sui-label color="green">{{ question.correct_answer }}</sui-label>
          </sui-accordion-title>
          <sui-accordion-content :key="question.value">
            <sui-label size="large" v-for="answer in question.answers" :key="answer">{{ answer }}</sui-label>
          </sui-accordion-content>
          </template>
        </sui-accordion>

        <sui-divider hidden/>
      </sui-container>
    </sui-grid>


  </div>
</template>

<script>
export default {
  name: "Results",

  props: {
    correctAnswers: Number,
    questions: Array,
  },
}
</script>

<style scoped>

</style>
