<template>
  <div>
    <sui-menu class="fixed inverted blue">
      <sui-menu-item is="sui-header">PiQuiz</sui-menu-item>
      <router-link class="text-menu" is="sui-menu-item" v-for="item in sections" :key="item[0]" :to="item[1]">
        {{ item[0] }}
      </router-link>
    </sui-menu>

    <router-view id="content"></router-view>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      sections: [
        ['Menu', '/menu'],
        ['New game', '/start'],
      ],
    }
  }
}
</script>

<style>

#content{
  padding-top: 100px;
}

.text-menu{
  font-size: 1.2em;
  font-family: 'Lato',sans-serif;
}

</style>
