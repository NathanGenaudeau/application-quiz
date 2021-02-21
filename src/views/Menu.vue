<template>
  <div>
    <sui-menu class="fixed inverted blue">
      <img class="ui medium image" src="../assets/logo.png">
      <router-link class="text-menu" is="sui-menu-item" v-for="item in sections" :key="item[0]" :to="item[1]">
        {{ item[0] }}
      </router-link>
    </sui-menu>

    <router-view id="content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      sections: [
        ['Home', '/home'],
        ['New game', '/start'],
      ],
    }
  }
}
</script>

<style>
#content {
  padding-top: 10%;
}

.text-menu {
  font-size: 1.3em;
}

body{
  background-color: #fafafa!important;
}
</style>
