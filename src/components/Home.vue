<template>
  <div>
    <sui-grid class="centered">
      <sui-container text>
        <h1 is="sui-header">Welcome to MultiQuiz !</h1>
        <sui-divider hidden/>
        <p>MultiQuiz is a game where you have to answer different questions and find the right answer among the proposed choices !</p>
        <p>Questions are taken from the Trivia database which can be found here : <a href="https://opentdb.com/" target="_blank">Trivia API</a>.</p>
        <sui-divider hidden/>
        <router-link to="start">
          <sui-button size="big" color="green">
            Let's go !
          </sui-button>
        </router-link>
      </sui-container>
    </sui-grid>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>


</style>
